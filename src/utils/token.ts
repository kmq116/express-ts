import crypto from 'crypto'
import jwt from 'jsonwebtoken'
export function generateToken(payload: any) {
  console.error('generateToken', payload)

  return jwt.sign(payload, 'random')
}

export function MD5(str: string) {
  console.error('MD5', str)
  return crypto.createHash('md5').update(str).digest('base64')
}
