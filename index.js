const express = require('express');
const server = express()
const { delay } = require('bluebird')

server.use('/', (req, res, next) => {
    console.log('here');
    const mapper = { 1: { destination: 1, duration: 2 }, 2: { destination: 2, duration: 2 }, 3: { destination: 1, duration: 2 } }
    const { id } = req.query
    if (mapper[id]) {
        req.query.destination = req.query.destination ? req.query.destination : mapper[id].destination
        req.query.duration = req.query.duration ? req.query.duration : mapper[id].duration
    }
    next()

})

server.get('/delay', async (req, res) => {
    res.status(200).send()
    console.log(req.query);
    const { delayTime, id } = req.query;
    await doSomething(delayTime, id)
    console.log(process.pid);
})

server.listen(4000, () => {
    console.log(process.pid);
    console.log('started');
})

async function doSomething(delayTime, id) {
    await delay(delayTime)
    console.log('done ', id);
}