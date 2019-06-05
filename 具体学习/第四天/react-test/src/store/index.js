/* 
  全局只有一个store
*/
import { createStore } from 'redux'
// 拿到合并的reducers
import reducer from '../reducers'

/**
 * 通过函数去创建store
 * @param {*} initStroe 
 */
export default function Store (initStroe) {
  return createStore(reducer, initStroe)
}