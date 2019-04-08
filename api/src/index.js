// Require the framework and instantiate it
const fastify = require('fastify')({
    logger: true
})

// Import Swagger Options
const swagger = require('./config/swagger')
// Register Swagger
fastify.register(require('fastify-swagger'), swagger.options)
// CORS
fastify.register(require('fastify-cors'), {
    // put your options here
})

const routes = require('./routes')

// Require external modules
const mongoose = require('mongoose')
// Connect to DB
mongoose.connect('mongodb://localhost:27017/switch2')
    .then(() => console.log('MongoDB connected…'))
.catch(err => console.log(err))

// Declare a route
fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
})

routes.forEach((route, index) => {
    fastify.route(route)
})


fastify.setErrorHandler((error, reply) => {
    error.message = JSON.parse(error.message);
    reply.send(error);
});

// Run the server!
const start = async () => {
    try {
        await fastify.listen(5000)
        fastify.swagger()
        fastify.log.info(`listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()




