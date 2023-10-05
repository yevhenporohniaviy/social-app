import jwt from 'jsonwebtoken'
import { setCookie, } from 'h3'

const generateAccessToken = (user) => {
  const token = process.env.JWT_ACCESS_TOKEN_SECRET
  return jwt.sign({
    userId: user.id
  }, token, {
    expiresIn: '10m'
  })
}

const generateRefreshToken = (user) => {
  const token = process.env.JWT_REFRESH_TOKEN_SECRET

  return jwt.sign({
    userId: user.id
  }, token, {
    expiresIn: '4h'
  })
}
export const decodeAccessToken = (token) => {
  const access_token = process.env.JWT_ACCESS_TOKEN_SECRET

  try {
    return jwt.verify(token, access_token)
  } catch (error) {
    return null 
  }
}

export const decodeRefreshToken = (token) => {
  const refresh_token = process.env.JWT_REFRESH_TOKEN_SECRET

  try {
    return jwt.verify(token, refresh_token)
  } catch (error) {
    return null 
  }
}

export const generateTokens = (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);


  return {
    accessToken,
    refreshToken
  }
}
export const sendRefreshToken = (event, token) => {
    setCookie(event, "refresh_token", token, {
        httpOnly: true,
        sameSite: true
    })
}