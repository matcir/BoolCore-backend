const express = require('express')
const app = express()
const PORT = 3000
const connection = require('./db/connection')
const cors = require('cors')
const productsRouter = require('./router/productsRouter')

app.use(express.json())



app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`)
})

app.use(cors())



app.use('/api/products', productsRouter)


