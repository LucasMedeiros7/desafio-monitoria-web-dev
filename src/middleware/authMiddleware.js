import dotenv from 'dotenv'
import JWT from 'jsonwebtoken'
dotenv.config()

export function authMiddleware (request, response, next) {
  const token = request.headers.authorization?.split(' ')[1]

  if (!token) {
    return response.status(401).json({ mensagem: 'Token não fornecido.' })
  }

  try {
    const secret = process.env.JWT_SECRET
    const decoded = JWT.verify(token, secret)
    if (!decoded.isAdmin) {
      return response.status(401).json({ mensagem: 'Você não tem permissão para acessar esta rota.' })
    }
    next()
  } catch (err) {
    return response.status(401).json({ mensagem: 'Token inválido.' })
  }
}
