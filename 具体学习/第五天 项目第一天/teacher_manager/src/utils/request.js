import Axios from 'axios'
import { serverHost, port } from '../config/index'

let r = Axios.create({
  baseURL: `${serverHost}:${port}/`
})
// yield 必须接受一个函数 返回一个Promise
let request = function (url='', options={}) {
  return function () {
    if (url === '') {
      return Promise.reject('必须传递url')
    }
    return r({
      url,
      method: 'get',
      ...options
    })
  }
}

export default request