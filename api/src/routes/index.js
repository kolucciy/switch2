// Import our Controllers
const meterController = require('../controllers/meterController')

const routes = [
    {
        method: 'GET',
        url: '/api/costcompare/:type',
        handler: meterController.getCostCompare
    },
    {
        method: 'GET',
        url: '/api/usage/:type',
        handler: meterController.getUsage
    },
    {
        method: 'GET',
        url: '/api/cost/:type',
        handler: meterController.getCost
    },
    {
        method: 'GET',
        url: '/api/updateusage',
        handler: meterController.updateUsageData
    }
    /*{
        method: 'GET',
        url: '/api/costsummary/:type',
        handler: meterController.getCostSummary
    },
    {
        method: 'POST',
        url: '/api/readings',
        handler: meterController.addReading,
    },
    {
        method: 'PUT',
        url: '/api/readings/:id',
        handler: meterController.updateReading
    },
    {
        method: 'DELETE',
        url: '/api/readings/:id',
        handler: meterController.deleteReading
    }*/
]

module.exports = routes