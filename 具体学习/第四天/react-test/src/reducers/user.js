import * as userConstants from '../constants/user'

/**
 * 识别发来的action 是干什么的action
 * @param {*} state 
 * @param {*} action 
 */
export default function (state = {}, action) {
  console.log(action)
  switch (action.type) {
    // 在匹配到了一个action 的时候 需要返回一个新的数据
    case userConstants.USER_LOGIN: 
      return {
        ...state,
        ...action.payload,
        isLoading: true
      }

    case userConstants.USER_LOGOUT: 
      return {
        isLoading: false
      }

    case userConstants.USER_UPDATE: 
      return {
        ...state,
        ...action.payload
      }

    // 必须有个默认值 
    default: {
      // console.log(state)
      return {
        ...state
      }
    }
  }
}