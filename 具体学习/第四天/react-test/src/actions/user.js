import * as userConstants from '../constants/user'

/*
 * actions 就是一条对象信息 带着一些描述
 action 发完 会给到 reducers里
 */

/**
 * 运行login 同时把需要的数据传递进去
 * 然后其会返回一个对象 对象会带着type的信息 作用始位了USER_LOGIN
 * type 就是 action 的名字
 * @param {*} payload 发出action带上的参数
 */
export const login =  (payload) => {
  return {
    type: userConstants.USER_LOGIN,
    payload
  }
}

export const logout =  (payload) => {
  return {
    type: userConstants.USER_LOGOUT,
    payload
  }
}

export const update =  (payload) => {
  return {
    type: userConstants.USER_UPDATE,
    payload
  }
}