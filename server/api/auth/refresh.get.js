import { sendError, parseCookies } from 'h3'
import { getRefreshTokenByToken } from '~/server/db/refreshTokens'
import { getUserById } from '~/server/db/users'
import { decodeRefreshToken, generateTokens } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event)
  const token = cookies.refresh_token


  if (!token) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Refresh token is invalid'
    }))
  }
  const refreshToken = await getRefreshTokenByToken(token)


  if (!refreshToken) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Refresh token is invalid'
    }))
  }

  const decodeToken = decodeRefreshToken(token)

  try {
    const user = await getUserById(decodeToken.userId)
    const { accessToken } = generateTokens(user)
    return {
      access_token: accessToken 
    }
  } catch (error) {
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: 'Something went'
    }))
  }

})