require('dotenv').config()
const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
