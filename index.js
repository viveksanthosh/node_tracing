const express = require('express');
const server = express()
const md5 = require('md5')
const { delay } = require('bluebird')

const timerApi = (req, res, next) => {
    const time = (new Date()).getTime()
    let id = md5(Math.random())
    let enterTime = time

    res.locals.id = id
    res.locals.enterTime = enterTime

    res.on("finish", () => {
        const time = (new Date()).getTime()
        //const { enterTime, id } = res.locals
        console.log(`time for ${id}->`, time - enterTime);
    })
    next()
}

server.get('/delay', timerApi, async (req, res) => {
    const { delayTime, id } = req.query;
    await doSomething(delayTime, id)
    console.log(process.pid);
    res.status(200).send()
})

server.listen(4000, () => {
    console.log(process.pid);
    console.log('started');
})

async function doSomething(delayTime, id) {
    await delay(delayTime)
    console.log('done ', id);
}