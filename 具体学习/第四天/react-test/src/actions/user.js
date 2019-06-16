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

 const loginApi = () => {
   return new Promise ((resolve) => {
     setTimeout(() => {
       resolve({
        isLoading: true,
        nickname: 'zhaosi',
        avatar: 'http://baidu.com'
       })
     }, 3000)
   })
 }

export const login =  (payload) => {

  // 第四版
  return async (dispatch) => {
    dispatch(update({ 
      loading: true 
    }))

    const res = await loginApi()
    console.log('res', res)
    
    dispatch(update({
      ...res,
      loading: false
    }))
  }


  // 第二版
  // 因为thunk 拦截了 actions ，会传入一个 dispatch 回来
  // return (dispatch) => {
  //   setTimeout(
  //     dispatch(
  //       update({
  //         isLoading: true,
  //         nickname: 'zhaosi',
  //         avatar: 'http://baidu.com'
  //       }))
  //   , 3000)
  // }


  // 第一版
  // return {
  //   type: userConstants.USER_LOGIN,
  //   payload
  // }
}

export const logout =  (payload) => {
  return {
    type: userConstants.USER_LOGOUT,
    payload
  }
}

export const update =  (payload) => {
  console.log('update')
  return {
    type: userConstants.USER_UPDATE,
    payload
  }
}