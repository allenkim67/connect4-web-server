const path = require('path')
const express = require('express')
const app = express()

app.use('/static', express.static('client'))

app.get('/connect4/api', (req, res) => {
    let items = [0, 1, 2, 3, 4, 5, 6].map(String)
    res.send(items[Math.floor(Math.random()*items.length)])
})

app.get('/connect4', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
})

app.listen(80, () => "listening on port 80")
