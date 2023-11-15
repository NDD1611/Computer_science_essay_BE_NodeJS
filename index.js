const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()
app.use(express.json())
app.use(cors())

const authRoutes = require('./routes/auth')
const driveRoutes = require('./routes/drive')

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use('/auth', authRoutes)
app.use('/drive', driveRoutes)

const port = 3001 || process.env.PORT
mongoose.connect(process.env.MONGO_DEV)
    .then(() => {
        app.listen(port, () => {
            console.log(`Example server listening on port ${port}`)
        })
    })
    .catch((err) => {
        console.log('connect database failed', err)
    })