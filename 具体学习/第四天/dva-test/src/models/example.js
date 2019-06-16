
export default {

  // 命名空间 具体命名
  namespace: 'example',

  // 传递的初始化数据
  state: {
    loading: false,
    isLoading: false
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    // put 发一个同步的actions call  调用异步的方法
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'update', payload: {
        loading: true
      }})

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

      const res = yield call(loginApi, {})

      yield put({ type: 'update', payload: {
        ...res,
        loading: false
      } });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    update(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
