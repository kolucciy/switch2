import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import moment from 'moment';
import FusionCharts from 'fusioncharts';
// Load the charts module
import charts from 'fusioncharts/fusioncharts.charts';
import widgets from 'fusioncharts/fusioncharts.widgets';
import theme from 'fusioncharts/themes/fusioncharts.theme.ocean';
import ReactFC from 'react-fusioncharts';

import chartConfigs2, { second_chart_today, second_chart_month, second_chart_year } from '../chart-configs/dashboard_second_chart';
import chartConfigs3, { third_chart_month, third_chart_year } from '../chart-configs/dashboard_third_chart';

import costChart, {
    cost_last_month,
    cost_this_month,
    cost_last_year,
    cost_this_year
} from '../cost/cost_data1';
import CostComponent from '../components/cost_component';

import * as utils from '../utils/utils';

charts(FusionCharts)
widgets(FusionCharts)
theme(FusionCharts)

FusionCharts.options.creditLabel = false;

class ChartDetail extends Component {

    componentDidMount() {}

    componentDidUpdate() {
        var t = document.getElementById("today");
        var m = document.getElementById("month");
        var y = document.getElementById("year");

        // Dashboard
        if (this.props.user.id === 1) {

            setTimeout(function () {
                document.getElementById("month").click();
            }, 300);

            document.getElementById("today").style.display = "block";
            document.getElementById("month").style.marginLeft = "";

            document.getElementById("parent2").setAttribute("class", "col-lg-6");
            document.getElementById("Dashboard").setAttribute("class", "left-option active");
            document.getElementById("Cost").setAttribute("class", "left-option");
            document.getElementById("bd-docs-nav").setAttribute("class", "bd-links collapse");

            ReactDOM.unmountComponentAtNode(document.getElementById('chart2'));
            document.getElementById("parent2").style.display = "block";
            document.getElementById("parent2").style.width = "auto";
            document.getElementById("parent2").style.height = "auto";

            ReactDOM.unmountComponentAtNode(document.getElementById('chart3'));
            document.getElementById("parent3").style.display = "block";
            document.getElementById("parent3").style.width = "auto";
            document.getElementById("parent3").style.height = "auto";

            ReactDOM.render(
                <ReactFC {...chartConfigs2} />,
                document.getElementById('chart2'));

            ReactDOM.render(
                <ReactFC {...chartConfigs3} />,
                document.getElementById('chart3'));


            // Logic for TODAY button when the user is on dashboard
            t.onclick = function () {

                document.getElementById("date").innerHTML = moment().format('MMMM, Do YYYY');

                document.getElementById("parent3").style.display = "none";
                document.getElementById("parent3").style.width = "0px";
                document.getElementById("parent3").style.height = "0px";

                // CHANGE IN COST
                var todaynewdata2 = second_chart_today;
                fetch('http://localhost:5000/api/costcompare/day')
                    // We get the API response and receive data in JSON format...
                    .then(response => response.json())
                    // ...then we update the chart data
                    .then(data => {
                        todaynewdata2.data[0].value = data[0]
                        todaynewdata2.data[1].value = data[1]
                        if(data[1] < data[0]) {
                            todaynewdata2.annotations.groups[0].items[0].text = "▼ " +  data[2] + "%";
                            todaynewdata2.annotations.groups[0].items[1].text = "DECREASE IN COST";
                            todaynewdata2.annotations.groups[0].items[0].color = "#B4F9A1";
                            todaynewdata2.annotations.groups[0].items[1].color = "#B4F9A1";
                            const max = Math.ceil(parseFloat(data[0]));
                            todaynewdata2.chart.yAxisMaxValue = max + max/5;
                        } else {
                            todaynewdata2.annotations.groups[0].items[0].text = "▲ " +  data[2] + "%";
                            todaynewdata2.annotations.groups[0].items[1].text = "INCREASE IN COST";
                            todaynewdata2.annotations.groups[0].items[0].color = "#E8506B";
                            todaynewdata2.annotations.groups[0].items[1].color = "#E8506B";
                            const max = Math.ceil(parseFloat(data[1]));
                            todaynewdata2.chart.yAxisMaxValue = max + max/5;
                        }

                        FusionCharts.items['mychart2'].setJSONData(todaynewdata2)
                    });
            };

            // Logic for MONTH button when the user is on dashboard
            m.onclick = function () {
                document.getElementById("date").innerHTML = moment().format('MMMM YYYY');

                // CHANGE IN COST
                var monthnewdata2 = second_chart_month;
                fetch('http://localhost:5000/api/costcompare/month')
                // We get the API response and receive data in JSON format...
                    .then(response => response.json())
                    // ...then we update the chart data
                    .then(data => {
                        monthnewdata2.data[0].value = data[0]
                        monthnewdata2.data[1].value = data[1]
                        if(data[1] < data[0]) {
                            monthnewdata2.annotations.groups[0].items[0].text = "▼ " +  data[2] + "%";
                            monthnewdata2.annotations.groups[0].items[1].text = "DECREASE IN COST";
                            monthnewdata2.annotations.groups[0].items[0].color = "#B4F9A1";
                            monthnewdata2.annotations.groups[0].items[1].color = "#B4F9A1";
                            const max = Math.ceil(parseFloat(data[0]));
                            monthnewdata2.chart.yAxisMaxValue = max + max/5;
                        } else {
                            monthnewdata2.annotations.groups[0].items[0].text = "▲ " +  data[2] + "%";
                            monthnewdata2.annotations.groups[0].items[1].text = "INCREASE IN COST";
                            monthnewdata2.annotations.groups[0].items[0].color = "#E8506B";
                            monthnewdata2.annotations.groups[0].items[1].color = "#E8506B";
                            const max = Math.ceil(parseFloat(data[1]));
                            monthnewdata2.chart.yAxisMaxValue = max + max/5;
                        }

                        // Render
                        FusionCharts.items['mychart2'].setJSONData(monthnewdata2)
                    });

                // USAGE ESTIMATE
                document.getElementById("parent3").style.display = "block";
                document.getElementById("parent3").style.width = "auto";
                document.getElementById("parent3").style.height = "auto";

                var monthnewdata3 = third_chart_month;
                fetch('http://localhost:5000/api/usage/month')
                // We get the API response and receive data in JSON format...
                    .then(response => response.json())
                    // ...then we update the chart data
                    .then(data => {
                        var monthLen = moment().daysInMonth();
                        var dayActiveArr = [];
                        // eslint-disable-next-line
                        for (var i = 1; i <= monthLen; i++) {
                            var currentDay = moment().format('D');
                            if (i <= currentDay) {
                                // eslint-disable-next-line
                                if (i % 7 != 0) {
                                    dayActiveArr.push({ "value": data[i - 1], "anchorAlpha": "0" });
                                } else {
                                    dayActiveArr.push({ "value": data[i - 1] });
                                }
                            } else {
                                dayActiveArr.push({ "value": null, "anchorAlpha": "0" });
                            }
                        }
                        monthnewdata3.dataset[0].data = dayActiveArr;
                        monthnewdata3.annotations.groups[0].items[1].text = data[currentDay - 1].toString() + " kWh";

                        var dayInActiveArr = [];
                        // eslint-disable-next-line
                        for (var i = 1; i <= monthLen; i++) {
                            if (i <= currentDay) {
                                dayInActiveArr.push({ "value": data[i - 1], "anchorAlpha": "0" });
                            } else {
                                // eslint-disable-next-line
                                if (i % 7 != 0) {
                                    dayInActiveArr.push({ "value": data[i - 1], "anchorAlpha": "0" });
                                } else {
                                    dayInActiveArr.push({ "value": data[i - 1] });
                                }
                            }
                        }
                        monthnewdata3.dataset[1].data = dayInActiveArr;
                        monthnewdata3.annotations.groups[0].items[3].text = data[monthLen - 1].toString() + " kWh";

                        // Render
                        FusionCharts.items['mychart3'].setJSONData(monthnewdata3);
                    });
            };

            // Logic for YEAR button when the user is on dashboard
            y.onclick = function () {
                document.getElementById("date").innerHTML = moment().format('YYYY');

                // CHANGE IN COST
                var yearnewdata2 = second_chart_year;
                fetch('http://localhost:5000/api/costcompare/year')
                // We get the API response and receive data in JSON format...
                    .then(response => response.json())
                    // ...then we update the chart data
                    .then(data => {
                        yearnewdata2.data[0].value = data[0]
                        yearnewdata2.data[1].value = data[1]
                        if(data[1] < data[0]) {
                            yearnewdata2.annotations.groups[0].items[0].text = "▼ " +  data[2] + "%";
                            yearnewdata2.annotations.groups[0].items[1].text = "DECREASE IN COST";
                            yearnewdata2.annotations.groups[0].items[0].color = "#B4F9A1";
                            yearnewdata2.annotations.groups[0].items[1].color = "#B4F9A1";
                            const max = Math.ceil(parseFloat(data[0]));
                            yearnewdata2.chart.yAxisMaxValue = max + max/5;
                        } else {
                            yearnewdata2.annotations.groups[0].items[0].text = "▲ " +  data[2] + "%";
                            yearnewdata2.annotations.groups[0].items[1].text = "INCREASE IN COST";
                            yearnewdata2.annotations.groups[0].items[0].color = "#E8506B";
                            yearnewdata2.annotations.groups[0].items[1].color = "#E8506B";
                            const max = Math.ceil(parseFloat(data[1]));
                            yearnewdata2.chart.yAxisMaxValue = max + max/5;
                        }

                        FusionCharts.items['mychart2'].setJSONData(yearnewdata2)
                    });

                // USAGE ESTIMATE
                document.getElementById("parent3").style.display = "block";
                document.getElementById("parent3").style.width = "auto";
                document.getElementById("parent3").style.height = "auto";

                var yearnewdata3 = third_chart_year;
                fetch('http://localhost:5000/api/usage/year')
                // We get the API response and receive data in JSON format...
                    .then(response => response.json())
                    // ...then we update the chart data
                    .then(data => {
                        var yearLen = 12;
                        var currentMonth = parseInt(moment().format('M')) - 1;
                        var monthActiveArr = [];
                        // eslint-disable-next-line
                        for (var i = 0; i < yearLen; i++) {
                            if (i <= currentMonth) {
                                // eslint-disable-next-line
                                if (i % 3 != 0) {
                                    monthActiveArr.push({ "value": data[i], "anchorAlpha": "0" });
                                } else {
                                    monthActiveArr.push({ "value": data[i] });
                                }
                            } else {
                                monthActiveArr.push({ "value": null, "anchorAlpha": "0" });
                            }
                        }
                        yearnewdata3.dataset[0].data = monthActiveArr;
                        yearnewdata3.annotations.groups[0].items[1].text = data[currentMonth].toString() + " kWh";


                        var monthInactiveArr = [];
                        // eslint-disable-next-line
                        for (var i = 0; i < yearLen; i++) {
                            // eslint-disable-next-line
                            if (i <= currentMonth) {
                                monthInactiveArr.push({ "value":data[i], "anchorAlpha": "0" });
                            } else {
                                // eslint-disable-next-line
                                if (i % 3 != 0) {
                                    monthInactiveArr.push({ "value": data[i], "anchorAlpha": "0" });
                                } else {
                                    monthInactiveArr.push({ "value": data[i] });
                                }
                            }
                        }
                        yearnewdata3.dataset[1].data = monthInactiveArr;
                        yearnewdata3.annotations.groups[0].items[3].text = data[yearLen - 1].toString() + " kWh";

                        // Render
                        FusionCharts.items['mychart3'].setJSONData(yearnewdata3);
                    });

            };
        }

        // Cost
        else if (this.props.user.id === 2) {

            setTimeout(function () {
                document.getElementById("month").click();
            }, 300);

            utils.disposeChart(FusionCharts, "mychart8")

            document.getElementById("today").style.display = "none";
            document.getElementById("month").style.marginLeft = 0;

            ReactDOM.unmountComponentAtNode(document.getElementById('chart2'));

            document.getElementById("Dashboard").setAttribute("class", "left-option");
            document.getElementById("Cost").setAttribute("class", "left-option active");
            document.getElementById("bd-docs-nav").setAttribute("class", "bd-links collapse");
            document.getElementById("parent2").setAttribute("class", "chart1-co col-lg-12 col-xl-12");
            document.getElementById("text2").innerHTML = "Cost";

            ReactDOM.unmountComponentAtNode(document.getElementById('chart3'));
            document.getElementById("parent3").style.display = "none";
            document.getElementById("parent3").style.width = "0px";
            document.getElementById("parent3").style.height = "0px";

            ReactDOM.render(
                <CostComponent costchart={costChart} />,
                document.getElementById('chart2'));


            // Logic for MONTH button when the user is on Cost tab
            m.onclick = function () {
                window.selectedperiod = "month";
                document.getElementById("date").innerHTML = moment().format('MMMM YYYY');
                document.getElementById("c2").innerHTML = "Last Month";
                document.getElementById("c1").innerHTML = "This Month";

                if (window.b2selected) {
                    var comonth2 = cost_last_month;

                    fetch('http://localhost:5000/api/cost/month')
                    // We get the API response and receive data in JSON format...
                        .then(response => response.json())
                        // ...then we update the chart data
                        .then(data => {
                            var gasDataArr = [];
                            // eslint-disable-next-line
                            for (var i = 0; i <= moment().subtract(1, 'month').daysInMonth(); i++) {
                                gasDataArr.push({ "value": data.last[i] });
                            }
                            comonth2.dataset[0].data = gasDataArr;
                            FusionCharts.items['mychart8'].setJSONData(comonth2);

                            document.getElementById("co-tablecell-title1").innerHTML = moment().subtract(2, 'month').format('MMMM');
                            document.getElementById("co-tablecell-value1").innerHTML = "£" + data.summary[0];

                            document.getElementById("co-tablecell-title2").innerHTML = moment().subtract(1, 'month').format('MMMM');
                            document.getElementById("co-tablecell-value2").innerHTML = "£" + data.summary[1];

                            var savings_value = Math.round((data.summary[0] - data.summary[1]) * 100) / 100;

                            if (savings_value < 0) {
                                savings_value = Math.abs(savings_value);
                                document.getElementById("co-tablecell-title3").innerHTML = "Savings";
                                document.getElementById("co-tablecell-value3").innerHTML = "-£" + savings_value;
                            }

                            else {
                                document.getElementById("co-tablecell-title3").innerHTML = "Savings";
                                document.getElementById("co-tablecell-value3").innerHTML = "£" + savings_value;
                            }

                            document.getElementById("co-tablecell-title4").style.display = "none";
                            document.getElementById("co-tablecell-value4").style.display = "none";
                        })
                }
                else {
                    var comonth = cost_this_month;

                    fetch('http://localhost:5000/api/cost/month')
                    // We get the API response and receive data in JSON format...
                        .then(response => response.json())
                        // ...then we update the chart data
                        .then(data => {
                            var gasDataArr = [];
                            // eslint-disable-next-line
                            for (var i = 0; i <= moment().daysInMonth(); i++) {
                                // eslint-disable-next-line
                                if (i < parseInt(moment().format('D'))) {
                                    gasDataArr.push({ "value": data.current[i] });
                                } else {
                                    gasDataArr.push({
                                        value: data.current[i],
                                        alpha: "30",
                                        toolText:
                                            "<div><i>Predicted: $seriesName<br>$label: $dataValue<i><div>"
                                    });
                                }
                            }
                            comonth.dataset[0].data = gasDataArr;
                            FusionCharts.items['mychart8'].setJSONData(comonth);

                            document.getElementById("co-tablecell-title1").innerHTML = moment().subtract(1, 'month').format('MMMM');
                            document.getElementById("co-tablecell-value1").innerHTML = "£" + data.summary[1];

                            var sfmVal = 0;
                            // eslint-disable-next-line
                            for (var i = 0; i < parseInt(moment().format('D')); i++) {
                                sfmVal = sfmVal + parseFloat(data.current[i]);
                            }
                            sfmVal = Math.round(sfmVal * 100) / 100;

                            document.getElementById("co-tablecell-title2").innerHTML = "So Far This Month";
                            document.getElementById("co-tablecell-value2").innerHTML = "£" + sfmVal;

                            document.getElementById("co-tablecell-title3").innerHTML = "Predicted This Month";
                            document.getElementById("co-tablecell-value3").innerHTML = "£" + data.summary[2];

                            document.getElementById("co-tablecell-title4").style.display = "block";
                            document.getElementById("co-tablecell-value4").style.display = "block";

                            document.getElementById("co-tablecell-title4").innerHTML = "Estimated savings";
                            document.getElementById("co-tablecell-value4").innerHTML = "£" + Math.round((data.summary[1] - data.summary[2]) * 100) / 100;
                        })
                }
            };

            // Logic for YEAR button when the user is on Cost tab
            y.onclick = function () {
                window.selectedperiod = "year";
                document.getElementById("date").innerHTML = moment().format('YYYY');

                document.getElementById("c2").innerHTML = "Previous Year";
                document.getElementById("c1").innerHTML = "This Year";

                if (window.b2selected) {
                    var coyear2 = cost_last_year;

                    fetch('http://localhost:5000/api/cost/year')
                    // We get the API response and receive data in JSON format...
                        .then(response => response.json())
                        // ...then we update the chart data
                        .then(data => {
                            var gasDataArr = [];
                            // eslint-disable-next-line
                            for (var i = 0; i < data.last.length; i++) {
                                gasDataArr.push({ "value": data.last[i] });
                            }

                            coyear2.dataset[0].data = gasDataArr;
                            FusionCharts.items['mychart8'].setJSONData(coyear2);

                            document.getElementById("co-tablecell-title1").innerHTML = moment().subtract(2, 'year').format('YYYY');
                            document.getElementById("co-tablecell-value1").innerHTML = "£" + data.summary[0];

                            document.getElementById("co-tablecell-title2").innerHTML = moment().subtract(1, 'year').format('YYYY');
                            document.getElementById("co-tablecell-value2").innerHTML = "£" + data.summary[1];

                            document.getElementById("co-tablecell-title3").innerHTML = "Savings";
                            document.getElementById("co-tablecell-value3").innerHTML = "£" + Math.round((data.summary[0] - data.summary[1]) * 100) / 100;

                            document.getElementById("co-tablecell-title4").style.display = "none";
                            document.getElementById("co-tablecell-value4").style.display = "none";
                        })
                }
                else {
                    var coyear = cost_this_year;

                    fetch('http://localhost:5000/api/cost/year')
                    // We get the API response and receive data in JSON format...
                        .then(response => response.json())
                        // ...then we update the chart data
                        .then(data => {
                            // Cost THIS YEAR Data
                            var gasDataArr = [];

                            // eslint-disable-next-line
                            for (var i = 0; i < data.current.length; i++) {
                                // eslint-disable-next-line
                                if (i < parseInt(moment().format('M'))) {
                                    gasDataArr.push({ "value": data.current[i] });
                                } else {
                                    gasDataArr.push({
                                        value: data.current[i],
                                        alpha: "30",
                                        toolText:
                                            "<div><i>Predicted: $seriesName<br>$label: $dataValue<i><div>"
                                    });
                                }
                            }
                            coyear.dataset[0].data = gasDataArr;
                            FusionCharts.items['mychart8'].setJSONData(coyear);

                            document.getElementById("co-tablecell-title1").innerHTML = moment().subtract(1, 'year').format('YYYY');
                            document.getElementById("co-tablecell-value1").innerHTML = "£" + data.summary[1];

                            var styVal = 0;
                            // eslint-disable-next-line
                            for (var i = 0; i < parseInt(moment().format('M')); i++) {
                                styVal = styVal + parseFloat(data.current[i]);
                            }
                            styVal = Math.round(styVal * 100) / 100;

                            document.getElementById("co-tablecell-title2").innerHTML = "So Far This Year";
                            document.getElementById("co-tablecell-value2").innerHTML = "£" + styVal;


                            document.getElementById("co-tablecell-title3").innerHTML = "Predicted This Year";
                            document.getElementById("co-tablecell-value3").innerHTML = "£" + data.summary[2];

                            document.getElementById("co-tablecell-title4").style.display = "block";
                            document.getElementById("co-tablecell-value4").style.display = "block";

                            document.getElementById("co-tablecell-title4").innerHTML = "Estimated Savings";
                            document.getElementById("co-tablecell-value4").innerHTML = "£" + Math.round((data.summary[1] - data.summary[2]) * 100) / 100;
                        })

                }
            };
        }

    }

    render() {
        return (
            <div></div>
        );

    }
}

// "state.activeUser" is set in reducers/index.js
function mapStateToProps(state) {
    return {
        user: state.activeUser
    };
}

export default connect(mapStateToProps)(ChartDetail);