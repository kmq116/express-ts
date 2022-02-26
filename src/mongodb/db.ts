import mongoose from 'mongoose'

const db = mongoose.connection
export async function dbListeners() {
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', () => {
    console.warn('Connected to MongoDB')
  })

  db.on('close', () => {})
  console.error('dbListeners')
  await mongoose.connect('mongodb://localhost:27017')
}
