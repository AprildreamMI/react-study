/**
 *  redux 最核心的管理模块
 * 全局只有一个store
 */

import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import reducers  from './reducers/index'

const initStore = {
  // 名字 必须和reducers 中的对应
  xxx: {
    name: 'zhaosi'
  }
}

export default createStore(
  reducers, 
  initStore, 
  composeWithDevTools(applyMiddleware(thunk))
)