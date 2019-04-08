require('dotenv').config();
const request = require("request-promise");
const cheerio = require('cheerio');
request.defaults({jar: true});

module.exports = (cb) => {
	const cookiejar = request.jar();
	return request({
		uri: "https://my.switch2.co.uk/Login",
		jar: cookiejar,
		transform: function (body) {
			return cheerio.load(body);
		}
	}).then(($) => {
		const verificationToken = $('#LoginForm > input').attr("value");
		return request({
			uri: "https://my.switch2.co.uk/Login",
			method: 'POST',
			jar: cookiejar,
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
				name: $('.customer-info-name').text(),
				acn: $('.customer-info-account-number').text(),
				address: $('.customer-info-address').text(),
				cookiejar: cookiejar
			}

			if(customer.name){
				return customer
			}
            return false
		});
	})
}
