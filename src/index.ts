import express from 'express'
// import swaggerUi from 'swagger-ui-express'
const app = express()

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(3000)
