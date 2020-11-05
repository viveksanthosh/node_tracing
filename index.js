const express = require('express');
const server = express()
const { delay } = require('bluebird')
const md5 = require('md5')
const createNamespace = require('cls-hooked').createNamespace;
const session = createNamespace('test_session');


const middleware = (req, res, next) => {
    session.run(() => {
        const transactionId = md5(Math.random());
        set('transactionId', transactionId)
        set(config.apiTransactionMeta.CACHE_STATUS, config.cacheStatusCodes.MISS)
        next()
    });
}

function get(key) {
    if (session && session.active) {
        return session.get(key);
    } else {
        console.log('session get miss')
    }
}


function set(key, value) {
    if (session && session.active) {
        return session.set(key, value);
    } else {
        console.log('session set miss')
    }
}


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

server.get('/delay', middleware, async (req, res) => {
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
    session.get('transactionId')
    await delay(delayTime)
    console.log('done ', id);
}