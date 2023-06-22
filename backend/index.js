const express = require('express')
const app = express()
const port = process.env.PORT | 5000
const connectToMongo = require('./db')
// this code is to resolve cors policy issue
var cors = require('cors')
app.use(cors())

app.use(express.json())

connectToMongo();

console.log("i am here")
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})