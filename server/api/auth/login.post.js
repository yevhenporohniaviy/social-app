import { getUserByUserName } from "~/server/db/users";
import bcrypt from 'bcrypt';
import { generateTokens, sendRefreshToken } from "~/server/utils/jwt";
import { userTransformer } from "~/server/transformers/user";
import { createRefreshToken } from "~/server/db/refreshTokens";
import { sendError} from 'h3'


export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { username, password } = body
  if (!username || !password) {
    return sendError(event, createError({statusCode: 400, statusMessage: "Invalid params"}))
  }
  const user = await getUserByUserName(username)

  if (!user) {
    return sendError(event, createError({statusCode: 400, statusMessage: "User name or password invalid"}))
  }

  const doesThePasswordMatch = await bcrypt.compare(password, user.password)

  if (!doesThePasswordMatch) {
    return sendError(event, createError({statusCode: 400, statusMessage: "User name or password invalid"}))
  }

  const { accessToken, refreshToken } = generateTokens(user)

  await createRefreshToken({
    token: refreshToken,
    userId: user.id
  })

  sendRefreshToken(event, refreshToken) 
  

  return {
    access_token: accessToken,
    user: userTransformer(user),

    refreshToken
  }
})