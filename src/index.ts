import express from 'express'
import cors from 'cors'
import { dbListeners } from './mongodb/db'
import useRouter from './router'
// import swaggerUi from 'swagger-ui-express'
dbListeners()
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
useRouter(app)
const PORT = process.env.PORT || 3000
app.get('/', (req, res) => {
  res.send('hello world')
})
// eslint-disable-next-line no-console
console.warn(`server started on port http://127.0.0.1:${PORT}`)
app.listen(PORT)
