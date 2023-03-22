import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export function generateToken (payload) {
  const secretKey = process.env.JWT_SECRET
  const options = { expiresIn: '1h' }
  return JWT.sign(payload, secretKey, options)
}
