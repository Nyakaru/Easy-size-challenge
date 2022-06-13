const path = require('path')
const express = require('express')
const cors = require('cors')

const app = express()
const port = 3355
app.use(cors())

app.use(express.static(path.join(__dirname, 'easy-app/build')));

app.use('/images', express.static('/images'))

//log on starting
app.listen(port, () => {
    console.log(`Starting server on http://localhost:${port}`)
})
