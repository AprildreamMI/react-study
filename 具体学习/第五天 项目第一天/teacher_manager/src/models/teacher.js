import request from '../utils/request'
// 做路由的跳转使用
import { routerRedux } from 'dva/router'

let teacher = {
  // 命名空间 具体命名
  namespace: 'teacher',
  state: {
    isLogin: false
  },
  effects: {
    // 异步action
    /* payload: 发来的action 中携带的数据
    select： 获取当前的state
    put: 调用reducers 
    call： 调用异步方法 */
    *doLogin ({ payload }, { select, put, call }) {
      // call 接受一个函数里面返回一个Promise
      let res = yield call(request('signin', {
        method: 'post',
        data: payload, // { username, password }
      }))
      console.log(res)
      if (res.data.code !== 0) return alert(res.data.message)
      yield put({type: 'changeLogin', payload: {isLogin: true}})
      yield put(routerRedux.push('/home'))
    }
  },
  reducers: {
    /*
      整个对象是 action  只要action中的payload
     action:  {
        payload: {num: 8}
        type: "index/addNum"
      }
      let { payload } = two  // { num: 8 }
    */
    changeLogin (state, { payload }) {
      return {
        isLogin: payload.isLogin
      }
    }
  }
}


export default teacher