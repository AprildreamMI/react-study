let index = {
  // 命名空间 具体命名
  namespace: 'index',
  state: {
    num: 0
  },
  effects: {
    // 异步action
    /* payload: 发来的action 中携带的数据
    select： 获取当前的state
    put: 调用reducers 
    call： 调用异步方法 */
    *changeNum ({ payload }, { select, put, call }) {
      // 保持reducers 中名字的一致性
      console.log(payload)
      yield put({ type: 'addNum', payload })
    }
  },
  reducers: {
    addNum (state, { payload }) {
      // 返回一个新对象 值不可变性
      console.log(state, payload)
      return {
        num: state.num + payload.num
      }
    }
  }
}


export default index