import type { Application } from 'express'
import upload from './upload'
import user from './user'

export default (app: Application) => {
  app.use(user)
  app.use('/', upload)
}
