const express = require('express')
const body = require('body-parser')
const cookie = require('cookie-parser')

const app = express()

app.use(body.json())
app.use(body.urlencoded({ extended: true }))
app.use(cookie())

const router = express.Router()

const cors = {
    'Access-Control-Allow-Origin': 'http://localhost:8080',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
}

router.post('/more/server2', (req, res) => {
    res.set(cors)
    res.json(req.cookies)
})

router.options('/more/server2', (req, res) => {
    res.set(cors)
    res.end()
})

app.use(router)

const port = 8090

module.exports = app.listen(port)