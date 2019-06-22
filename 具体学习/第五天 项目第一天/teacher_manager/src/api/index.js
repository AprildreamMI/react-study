/*
  ===================================
    定义请求后端API接口
  ===================================
*/

// import { get, post, put, remove } from './config'
import { get, post, remove, put } from './config'

// 测试接口 要在Node 服务器中开启跨越请求
export const getAll = () => get(`/test`)

/*
  export const deleteModule = (id, data) => remove(`/api/v1/portal/modules/${id}`, data)
*/


// 登录
export const login = (data) => post('/signin', data)
