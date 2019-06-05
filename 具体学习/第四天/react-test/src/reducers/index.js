import { combineReducers }  from 'redux'

import user from './user'
import city from './city'

// 存在多个reducers 合并以下
export default combineReducers({
  user,
  city,
})