const express = require('express');

const server = express()

server.get('/delay', (req, res) => {
    console.log(process.pid);
    res.status(200).send()
})

server.listen(4000, () => {
    console.log(process.pid);
    console.log('started');
})