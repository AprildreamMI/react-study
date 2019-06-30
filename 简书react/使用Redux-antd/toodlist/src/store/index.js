// 引入
import { createStore } from 'redux'
// 引入对数据的操作
import reducer from '../reducer/index'


// 创建store
const store = createStore(
  reducer,
  // 加上
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
