// External Dependancies
const boom = require('boom')
const moment = require('moment');
// Get Data Models
const Meter = require('../models/Meter')

// Get switch2 helper
const getData = require('../utils/getData');

const standingCharge = 0.7251171875;
const priceKwh = 0.0790196276811008;


// Get Cost Compare for dashboard by day, month, year
exports.getCostCompare = async (req, reply) => {
    try {
        const today = await Meter.findOne(
            {"date": {"$gte": moment().startOf('day').toDate(), "$lte": moment().endOf('day').toDate()}})

        const type = req.params.type
        if(type === 'day') {
            const yesterday = await Meter.findOne(
                {"date": {"$gte": moment().add(-1, 'days').startOf('day').toDate(), "$lte": moment().add(-1, 'days').endOf('day').toDate()}})
            const dayBeforeYesterday = await Meter.findOne(
                {"date": {"$gte": moment().add(-2, 'days').startOf('day').toDate(), "$lte": moment().add(-2, 'days').endOf('day').toDate()}})

            const currCost = ((today.amount - yesterday.amount) * priceKwh).toFixed(2);
            const prevCost = ((yesterday.amount - dayBeforeYesterday.amount) * priceKwh).toFixed(2);

            const change = Math.round(((prevCost - currCost) / prevCost) * 100);

            return [prevCost, currCost, change];

        } else if(type === 'year') {
            // Year
            const lastYearEnd = await Meter.findOne(
                {"date": {"$gte": moment().add(-1, 'year').endOf('year').startOf('day').toDate(), "$lte": moment().add(-1, 'year').endOf('year').endOf('day').toDate()}})
            const lastYearToday = await Meter.findOne(
                {"date": {"$gte": moment().add(-1, 'year').startOf('day').toDate(), "$lte": moment().add(-1, 'year').endOf('day').toDate()}})
            const prevLastYearEnd = await Meter.findOne(
                {"date": {"$gte": moment().add(-2, 'year').endOf('year').startOf('day').toDate(), "$lte": moment().add(-2, 'year').endOf('year').endOf('day').toDate()}})

            const currCost = ((today.amount - lastYearEnd.amount) * priceKwh).toFixed(2);
            let prevCost = 0;
            let change = 100;
            if(prevLastYearEnd) {
                prevCost = ((lastYearToday.amount - prevLastYearEnd.amount) * priceKwh).toFixed(2);
                change =  Math.round(((prevCost - currCost) / prevCost) * 100);
            }

            return [prevCost, currCost, change];

        } else {
            // Month
            const lastMonthEnd = await Meter.findOne(
                {"date": {"$gte": moment().add(-1, 'month').endOf('month').startOf('day').toDate(), "$lte": moment().add(-1, 'month').endOf('month').endOf('day').toDate()}})
            const lastMonthToday = await Meter.findOne(
                {"date": {"$gte": moment().add(-1, 'month').startOf('day').toDate(), "$lte": moment().add(-1, 'month').endOf('day').toDate()}})
            const prevLastMonthEnd = await Meter.findOne(
                {"date": {"$gte": moment().add(-2, 'month').endOf('month').startOf('day').toDate(), "$lte": moment().add(-2, 'month').endOf('month').endOf('day').toDate()}})

            const currCost = ((today.amount - lastMonthEnd.amount) * priceKwh).toFixed(2);
            const prevCost = ((lastMonthToday.amount - prevLastMonthEnd.amount) * priceKwh).toFixed(2);

            const change = Math.round(((prevCost - currCost) / prevCost) * 100);
            return [prevCost, currCost, change];
        }
    } catch (err) {
        throw boom.boomify(err)
    }
}


// Get Usage for Dashboard by month, year
exports.getUsage = async (req, reply) => {
    try {
        const type = req.params.type
        if(type === 'year') {
            var data = [];
            for(var m = 0; m <= moment().month(); m++) {
                if(m == moment().month()) {
                    // Current month, calculate usage until today
                    const lastMonthEnd = await Meter.findOne(
                        {"date": {"$gte": moment().month(m-1).endOf('month').startOf('day').toDate(), "$lte": moment().month(m-1).endOf('month').endOf('day').toDate()}})
                    const today = await Meter.findOne(
                        {"date": {"$gte": moment().startOf('day').toDate(), "$lte": moment().endOf('day').toDate()}})

                    var prevMonth = 0;
                    if(data[data.length-1]) {
                        prevMonth = data[data.length-1];
                    }
                    data.push(today.amount - lastMonthEnd.amount + prevMonth);
                } else {
                    const lastMonthEnd = await Meter.findOne(
                        {"date": {"$gte": moment().month(m-1).endOf('month').startOf('day').toDate(), "$lte": moment().month(m-1).endOf('month').endOf('day').toDate()}})
                    const monthEnd = await Meter.findOne(
                        {"date": {"$gte": moment().month(m).endOf('month').startOf('day').toDate(), "$lte": moment().month(m).endOf('month').endOf('day').toDate()}})

                    var prevMonth = 0;
                    if(data[data.length-1]) {
                        prevMonth = data[data.length-1];
                    }
                    data.push(monthEnd.amount - lastMonthEnd.amount + prevMonth);
                }
            }
            var averageUsePerMonth = Math.round(data[data.length-1]/data.length);
            for (var i = 0; i <= 12; i++) {
                if(!data[i]) {
                    data.push(data[i - 1] + averageUsePerMonth);
                }
            }
            return data;
        } else {
            const readings = await Meter.find(
                {"date": {"$gte": moment().add(-1, 'month').endOf('month').startOf('day').toDate(), "$lte": moment().endOf('day').toDate()}}
                ).sort({date: 1});
            var data = [];
            readings.forEach(
                function (doc) {
                    if(data[0]) {
                        data.push(doc.amount - data[0]);
                    } else {
                        data.push(doc.amount);
                    }

                });
            data.shift(); // remove last day of the last month

            var averageUsePerDay = Math.round(data[data.length-1]/data.length);
            for (var i = 1; i <= moment().daysInMonth(); i++) {
                if(!data[i - 1]) {
                    data.push(data[i - 2] + averageUsePerDay);
                }
            }

            return data;
        }
     } catch (err) {
        throw boom.boomify(err)
    }
}


// Get COST by month, year
exports.getCost = async (req, reply) => {
    try {
        const type = req.params.type
        if(type === 'year') { // Year
            // Current Year
            var data = [];
            var total = 0;
            for(var m = 0; m <= moment().month(); m++) {
                if(m == moment().month()) {
                    // Current month, calculate usage until today
                    const lastMonthEnd = await Meter.findOne(
                        {"date": {"$gte": moment().month(m-1).endOf('month').startOf('day').toDate(), "$lte": moment().month(m-1).endOf('month').endOf('day').toDate()}})
                    const today = await Meter.findOne(
                        {"date": {"$gte": moment().startOf('day').toDate(), "$lte": moment().endOf('day').toDate()}})

                    data.push(((today.amount - lastMonthEnd.amount)*priceKwh).toFixed(2));
                } else {
                    const lastMonthEnd = await Meter.findOne(
                        {"date": {"$gte": moment().month(m-1).endOf('month').startOf('day').toDate(), "$lte": moment().month(m-1).endOf('month').endOf('day').toDate()}})
                    const monthEnd = await Meter.findOne(
                        {"date": {"$gte": moment().month(m).endOf('month').startOf('day').toDate(), "$lte": moment().month(m).endOf('month').endOf('day').toDate()}})

                    data.push(((monthEnd.amount - lastMonthEnd.amount)*priceKwh).toFixed(2));
                    total += (monthEnd.amount - lastMonthEnd.amount)*priceKwh;
                }
            }
            var averageUsePerMonth = Math.round(total/(data.length-1)).toFixed(2);
            for (var i = 0; i <= 12; i++) {
                if(!data[i]) {
                    data.push(averageUsePerMonth);
                }
            }

            // Last Year
            var data2 = [];
            var total2 = 0;
            for(var m = 0; m <= 11; m++) {
                const lastMonthEnd = await Meter.findOne(
                    {"date": {"$gte": moment().add(-1, 'year').month(m-1).endOf('month').startOf('day').toDate(), "$lte": moment().subtract(1,'year').month(m-1).endOf('month').endOf('day').toDate()}})
                const monthEnd = await Meter.findOne(
                    {"date": {"$gte": moment().add(-1, 'year').month(m).endOf('month').startOf('day').toDate(), "$lte": moment().subtract(1,'year').month(m).endOf('month').endOf('day').toDate()}})

                if(lastMonthEnd && monthEnd) {
                    data2.push(((monthEnd.amount - lastMonthEnd.amount)*priceKwh).toFixed(2));
                    total2 += (monthEnd.amount - lastMonthEnd.amount)*priceKwh;
                } else {
                    data2.push(0);
                }
            }

            return {"summary": [0, total2.toFixed(2), 1450], "current": data, 'last': data2};

        } else { // Month

            // Current Month
            const readings = await Meter.find(
                {"date": {"$gte": moment().add(-1, 'month').endOf('month').startOf('day').toDate(), "$lte": moment().endOf('day').toDate()}}
            ).sort({date: 1});
            var data = [];
            var prev = 0;
            readings.forEach(
                function (doc) {
                    if(data[0]) {
                        var dayUsageKwh = doc.amount - data[0] - prev;
                        data.push((dayUsageKwh*priceKwh).toFixed(2));
                        prev += dayUsageKwh;
                    } else {
                        data.push(doc.amount);
                    }

                });
            data.shift(); // remove last day of the last month

            var averageUsePerDay = data.reduce(function(a, b) { return parseFloat(a) + parseFloat(b); }, 0)/data.length;
            var predicted = 0;
            for (var i = 1; i <= moment().daysInMonth(); i++) {
                if(!data[i - 1]) {
                    data.push(averageUsePerDay.toFixed(2));
                }
                predicted += parseFloat(data[i - 1]);
            }

            // Previous Month
            const readings2 = await Meter.find(
                {"date": {"$gte": moment().add(-2, 'month').endOf('month').startOf('day').toDate(), "$lte": moment().add(-1, 'month').endOf('month').endOf('day').toDate()}}
            ).sort({date: 1});
            var data2 = [];
            var prev = 0;
            var totalPrev = 0;
            readings2.forEach(
                function (doc) {
                    if(data2[0]) {
                        var dayUsageKwh = doc.amount - data2[0] - prev;
                        data2.push((dayUsageKwh*priceKwh).toFixed(2));
                        prev += dayUsageKwh;
                        totalPrev += parseFloat((dayUsageKwh*priceKwh).toFixed(2));
                    } else {
                        data2.push(doc.amount);
                    }

                });
            data2.shift(); // remove last day of the previous month

            // Month before previous
            const readings3 = await Meter.find(
                {"date": {"$gte": moment().add(-3, 'month').endOf('month').startOf('day').toDate(), "$lte": moment().add(-2, 'month').endOf('month').endOf('day').toDate()}}
            ).sort({date: 1});
            var data3 = [];
            var prev = 0;
            var totalPrevLast = 0;
            readings3.forEach(
                function (doc) {
                    if(data3[0]) {
                        var dayUsageKwh = doc.amount - data3[0] - prev;
                        data3.push((dayUsageKwh*priceKwh).toFixed(2));
                        prev += dayUsageKwh;
                        totalPrevLast += parseFloat((dayUsageKwh*priceKwh).toFixed(2));
                    } else {
                        data3.push(doc.amount);
                    }

                });

            return {"summary": [totalPrevLast.toFixed(2), totalPrev.toFixed(2), predicted.toFixed(2)], "current": data, 'last': data2};
        }
    } catch (err) {
        throw boom.boomify(err)
    }
}


// Get data from Switch2
exports.updateUsageData = async (req, reply) => {
    try {
        const data = getData();
        return data;
    } catch (e) {
        throw boom.boomify(err)
    }
}