const mongoose = require('mongoose');
require('dotenv').config();
const request = require("request-promise");
const cheerio = require('cheerio');
const moment = require('moment');
const _ = require('underscore');
request.defaults({jar: true});

module.exports = () => {
    return new Promise((resolve, reject) => {

        const cookieJar = request.jar();

        request({
            uri: "https://my.switch2.co.uk/Login",
            jar: cookieJar,
            transform: function (body) {
                return cheerio.load(body);
            }
        }).then(($) => {
            const verificationToken = $('#LoginForm > input').attr("value");
            request({
                uri: "https://my.switch2.co.uk/Login",
                method: 'POST',
                jar: cookieJar,
                form: {
                    __RequestVerificationToken: verificationToken,
                    UserName: process.env.USERNAME,
                    Password: process.env.PASSWORD,
                },
                followAllRedirects: true,
                transform: function (body) {
                    return cheerio.load(body);
                }
            }).then(($) => {
                // Customer data (might be useful)
                const customer = {
                    name: $('.customer-info-name').text().trim(),
                    acn: $('.customer-info-account-number').text().trim(),
                    address: $('.customer-info-address').text().trim()
                }

                if (customer.name) {
                    // Successful login
                    const options = {
                        uri: "https://my.switch2.co.uk/MeterReadings/History",
                        jar: cookieJar,
                        transform: function (body) {
                            return cheerio.load(body);
                        }
                    };

                    // Make the request
                    request(options)
                        .then(($) => {
                            const db = mongoose.connection;
                            const collection = db.collection('records');

                            collection.countDocuments({}, function (err, count) {
                                if (err) reject(err);

                                if (!count) {
                                    const verificationToken = $('#MeterReadingsHistoryForm > input').attr("value");
                                    const registerId = $('#RegisterId option:selected').attr("value");
                                    const options = {
                                        uri: "https://my.switch2.co.uk/MeterReadings/History",
                                        method: 'POST',
                                        jar: cookieJar,
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

                                    request(options)
                                        .then(($) => {
                                            resolve(parseRecords($, db, customer))
                                        })
                                        .catch(function (err) {
                                            reject(err);
                                        })
                                } else
                                    resolve(parseRecords($, db, customer))

                            })
                        })
                        .catch(function (err) {
                            reject(err);
                        })
                } else
                    reject(new Error('Login failed. Please check .env file.'))

            }).catch(function (err) {
                reject(err);
            })

        }).catch(function (err) {
            reject(err);
        })
    });
};

// Parse and store the records in the DB
function parseRecords($, db, customer) {
    let records = [];
    $('.meter-reading-history-table-data-row.desktop-layout').each(function (i, elem) {
        const date = moment.utc($(this).find('.meter-reading-history-table-data-date-row-item').text(), 'Do MMM YYYY').toDate();
        const amount = parseInt($(this).find('.meter-reading-history-table-data-amount-row-item').text());
        records.push({
            date,
            amount
        });
    });

    if (!records.length) {
        return [];
    } else {
        const collection = db.collection('records');
        return _.each(records, async (record) => {
            record.acn = customer.acn;
            collection.updateOne({date: record.date}, {$set: record}, {upsert: true});
        })
    }
}