import axios from 'axios'

axios.defaults.baseURL = process.env.BACKEND_URL ? process.env.BACKEND_URL : 'http://localhost:3000'

export default axios
