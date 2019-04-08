const rp = require('request-promise');
const cheerio = require('cheerio');
const moment = require('moment');
const _ = require('underscore');
const mongoose = require('mongoose')

// Pass in the db and cookie object
module.exports = (cookiejar) => {

    if (!cookiejar) {
        throw new Error('DB and cookiejar must be supplied to scraper')
    }

    const options = {
        uri: "https://my.switch2.co.uk/MeterReadings/History",
        jar: cookiejar,
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    // Make the request
    return rp(options)
        .then(($) => {
            var db = mongoose.connection;
            const collection = db.collection('records');
            const numOfDocs = collection.countDocuments({});
            if (!numOfDocs) {
                const verificationToken = $('#MeterReadingsHistoryForm > input').attr("value");
                const registerId = $('#RegisterId option:selected').attr("value");
                const options = {
                    uri: "https://my.switch2.co.uk/MeterReadings/History",
                    method: 'POST',
                    jar: cookiejar,
                    form: {
                        __RequestVerificationToken: verificationToken,
                        Page: 1,
                        TotalPages: 22,
                        RegisterId: registerId,
                        PageSize: 2147483647
                    },
                    transform: function (body) {
                        return cheerio.load(body);
                    }
                };

                return rp(options)
                    .then(($) => {
                        return parseRecords($, db);
                    })
            } else {
                return parseRecords($, db);
            }
        })
}

function parseRecords($, db) {
    // Parse and store the records
    const records = [];
    $('.meter-reading-history-table-data-row.desktop-layout').each(function (i, elem) {
        const date = moment.utc($(this).find('.meter-reading-history-table-data-date-row-item').text(), 'Do MMM YYYY').toDate();
        const amount = parseInt($(this).find('.meter-reading-history-table-data-amount-row-item').text());
        records.push({
            date,
            amount,
        });
    });

    // Log how many were found
    console.log(`Found ${records.length} records...`)
    if (!records.length) {
        return false;
    } else {
        // Store the parsed records in mongo
        const collection = db.collection('records');
        return _.each(records, async (record) => {
            // Upsert if the record does not exist yet
            collection.updateOne({date: record.date}, {$set: record}, {upsert: true}, (err, result) => {
                if (err) console.error(err);
                // Record updated
                console.log(`Updated ${record.date} to ${record.amount}`)
            });
        })
    }
}