const express  = require('express')
const cors     = require('cors')
const app      = express()

const name     = "SANS"
const password = "123"

app.use(cors({
  origin: "*"
}))
app.use(express.json())

app.post('/', (req, res) => {
  if (req.body.name === name && req.body.pass === password) {
    res.send(true)
  } else {
    res.send(false)
  }
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running...");
})