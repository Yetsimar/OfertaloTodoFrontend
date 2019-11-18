import axios from 'axios'
import { server, port } from './environment'
import $cookies from 'vue-cookies'
export default () => {
  return axios.create({
    baseURL: `${server}:${port}/api/`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + $cookies.get('token')
    }
  })
}
