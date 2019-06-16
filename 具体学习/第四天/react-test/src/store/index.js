/* 
  全局只有一个store
*/
// 1、引用 applyMiddleware, compose 
import { createStore, applyMiddleware, compose } from 'redux'

// 2、安装引用 -S
// 使用redux-thunk+
import thunkMiddleware from 'redux-thunk'

// 拿到合并的reducers
import reducer from '../reducers'

// 第一种方式  3、配置
 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const enhancer = composeEnhancers(
	applyMiddleware(thunkMiddleware),
);

/**
 * 通过函数去创建store
 * @param {*} initStroe 
 */
export default function Store (initStroe) {
  // 4、注册中间件 拦截actions 的发出
  // 第三个参数做一些扩展的处理
  return createStore(
    reducer,
    initStroe,
    // 或者说使用第一种方法 
    enhancer
    /* // 下面是第二种方式
    // 3、进行注册的配置
    compose(
      applyMiddleware(thunkMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ) */
  )
}