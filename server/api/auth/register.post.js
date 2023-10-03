import { sendError} from 'h3'
export default defineEventHandler(async (event) => {
  const body = await useBody(event)
  const { username, name, email, password, repeatPassword } = body
  if (!username || !name || !email || !password || !repeatPassword) {
    return sendError(event, createError({statusCode: 400, statusMessage: "Invalid params"}))
  }
  
  return {
    body
  }
})