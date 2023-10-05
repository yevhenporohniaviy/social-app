import jwt_decode from 'jwt-decode'

export default () => {
  const useAuthToken = () => useState('auth_token')
  const useAuthUser = () => useState('auth_user')
  const useAuthLoading = () => useState('auth_loading', () => true)

  const setToken = (newToken) => {
    const authToken = useAuthToken()
    authToken.value = newToken
  }

  const setUser = (newUser) => {
    const authUser = useAuthUser()
    authUser.value = newUser
  }

  const setIsLoading = (value) => {
    const authLoading = useAuthLoading()
    authLoading.value = value
  }

  const login = ({ username, password }) => {
    return new Promise(async (res, rej) => {
      try {
        const data = await $fetch('/api/auth/login', {
          method: "POST",
          body: {
            username,
            password
          }
        })

        setToken(data.access_token)
        setUser(data.user)
        res(true)
      } catch (error) {
        rej(error)
      }
    })
  }

  const reRefreshAccessToken = () => {
    const authToken = useAuthToken()

    if (!authToken.value) {
      return 
    }

    const jwt = jwt_decode(authToken.value)
    const newRefreshTime = jwt.exp - 60000 

    setTimeout( async () => {
      await refreshToken()
      reRefreshAccessToken()
    }, newRefreshTime) 
  }

  const initAuth = () => {
    return new Promise(async (res, rej) => {
      setIsLoading(true)
      try {
        await refreshToken()
        await getUser()

        reRefreshAccessToken()

        res(true)
      } catch (error) {
        rej(error)
      } finally {
       setIsLoading(false)
      }
    })
  }

  const refreshToken = () => {
    return new Promise(async (res, rej) => {
      try {
        const data = await $fetch('/api/auth/refresh')
    
        setToken(data.access_token)
        res(true) 
      } catch (error) {
        rej(error)
      }
    })
  }
  const getUser = () => {
    return new Promise(async (res, rej) => {
      try {
        const data = await userFetchApi('/api/auth/user')
        setUser(data.user)
        res(true) 
      } catch (error) {
        rej(error)
      }
    })
  }

  return  { 
    login,
    useAuthUser,
    useAuthToken,
    initAuth,
    useAuthLoading
  }


}