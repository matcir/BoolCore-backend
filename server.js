const express = require('express')
const app = express()
const PORT = 3000
const connection = require('./db/connection')
const cors = require('cors')

app.use(express.json())


app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`)
})

app.use(cors())

//INDEX
app.get('/api/products', (req, res) => {
    //SAVING THE QUERY STRING INTO A VARIABLE
    const sql = 'SELECT * FROM boolcore_db.products'
    connection.query(sql, (err, result) => {

        //Manage 500 error
        if (err) return res.status(500).json({ error: 'true', message: err.message })

        res.json(result)
    })

})