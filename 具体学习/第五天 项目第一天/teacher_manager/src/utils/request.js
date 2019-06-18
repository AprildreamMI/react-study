import Axios from 'axios'
import { serverHost, port } from '../config/index'

let r = Axios.create({
  baseURL: `${serverHost}:${port}/`
})

let request = function (url='', options={}) {
  if (url === '') {
    return Promise.reject('必须传递url')
  }
  return r({
    url,
    method: 'get',
    ...options
  })
}

export default request