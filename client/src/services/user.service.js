import axios from '../utils/axiosSettings'

export const userServices = {
  login,
  logout,
  register
}

async function login (email, password) {
  const response = await axios.post('login', { email, password })
  const user = response.data

  if (user.token) {
    localStorage.setItem('user', JSON.stringify(user))
  }
  return user
}

function logout () {
  localStorage.removeItem('user')
}

async function register (user) {
  await axios.post('register', user)
}
