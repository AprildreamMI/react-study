import request from '../utils/request'
// 做路由的跳转使用
import { routerRedux } from 'dva/router'

import * as api from '../api/index'

let teacher = {
  // 命名空间 具体命名
  namespace: 'teacher',
  state: {
    isLogin: false,
    // 讲师列表
    teachers:[],
    //总记录数
    total: 0,
  },
  effects: {
    // 异步action 同步返回 结果
    /* payload: 发来的action 中携带的数据
    select： 获取当前的state
    put: 调用reducers 
    call： 调用异步方法 */
    *doLogin ({ payload }, { select, put, call }) {
      // call 接受一个函数里面返回一个Promise 同步返回
      let res
      try {
        res = yield call(() => api.login(payload))
      } catch (error) {
        console.log('登录失败', error)
      }
      if (res.data.code === 0) {
        console.log(res.data)
        window.sessionStorage.setItem('user', JSON.stringify(res.data.data.user))
        yield put({type: 'changeLogin', payload: {isLogin: true}})
        yield put(routerRedux.push('/home'))
      }
    },
    // 更新teachers
    *updateTeacher({payload},{select,put,call}) {
      let res
      try {
        /* // 传入 {
          page,
          count
        } */
        res = yield call(() => api.getTeachers(payload))
      } catch (error) {
        console.log('获取教师列表错误')
      }
      if (res.data.code === 0) {
        console.log('教师列表', res.data)
        // 将teacher信息保存到state中
        yield put({ type:'update', payload:{ 
            teachers:res.data.data.teachers,
            total:res.data.data.total 
          }
        })
      }
    },
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
    },
    update (state, { payload }) {
      return {
        teachers: payload.teachers,
        total: payload.total
      }
    }
  }
}


export default teacher