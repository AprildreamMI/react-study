# API

## config

```javascript
import axios from 'axios'
import cookie from '~/utils/cookie'

export const baseURL = {
  'production': 'https://cadre-training-service.yoyohr.com',
  'lan': 'http://192.168.1.124:8070',
  'development': 'http://192.168.1.186:9904'
}[process.env.NODE_ENV]

// 30秒中断请求
axios.defaults.timeout = 30000

// 拦截发送请求
axios.interceptors.request.use(
  config => {
    let token = cookie.get('token')
    token && (config.headers.Authorization = 'Bearer ' + token)
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// 拦截返回结果
axios.interceptors.response.use(
  res => {
    if (res.status === 200) {
      let token
      if (res.headers && res.headers.authorization) {
        token = res.headers.authorization.substr(7)
        cookie.set('token', token)
      }
      if (res.data.code === 10127 || res.data.code === 10126 || res.data.code === 10117) {
        // token失效
        cookie.remove('token')
        // 返回首页
        location.href = '/login'
      }
    }
    return res
  },
  err => {
    return Promise.reject(err)
  }
)

/**
 * request封装
 */
function fetchData (method, url, data = {}) {
  return new Promise((resolve, reject) => {
    let request
    if (method === 'get' || method === 'delete') {
      request = axios[method](baseURL + url, { params: data })
    } else {
      request = axios[method](baseURL + url, data)
    }
    request
      .then(res => {
        resolve(res)
      })
      .catch(e => {
        reject(e)
      })
  })
}

export function get (url, params) {
  return fetchData('get', url, params)
}

export function post (url, data) {
  return fetchData('post', url, data)
}

export function put (url, data) {
  return fetchData('put', url, data)
}

export function remove (url, params) {
  return fetchData('delete', url, params)
}

export function upload (url, data) {
  const formData = new FormData()
  Object.keys(data).forEach((child) => {
    formData.append(child, data[child])
  })
  return post(url, formData)
}

```

## index

```javascript
import { baseURL, post, get, put } from './config'

export const isRefresh = true
export const uploadURL = baseURL + '/weapi/v1/uploads'

// export const downloadModel = {
//   'production': '',
//   'development': 'http://192.168.1.186:9903/预算科目模版.xlsx',
//   'lan': 'http://192.168.1.124:8060/预算科目模版.xlsx'
// }[process.env.NODE_ENV]

/* 公共接口 start */

export const uploads = (data) => post(`/weapi/v1/uploads`, data)

/* 公共接口 end */

/**
 * 后台登录
 * @param {*} data
 */
export const login = (data) => post(`/weapi/v1/login`, data)

/**
 * 修改密码
 * @param {*} data
 */
export const chagePw = (data) => put(`/weapi/v1/change`, data)

/* 超管 start */

/**
 * 获取账号列表
 * @param {*} data
 */
export const getAccountList = () => get(`/weapi/v1/users`)

/**
 * 添加后台用户
 * @param {*} data
 */
export const addAccount = (data) => post(`/weapi/v1/user`, data)

/**
 * 更新账号的信息
 * @param {*} id
 */
export const updateAccount = (id, data) => put(`/weapi/v1/user/${id}`, data)
```

