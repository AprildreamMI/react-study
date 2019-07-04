export default function (state = { name: 'zhaosi' }, action) {
  switch (action.type) {
    // 必须有个默认值 
    default: {
      return {
        ...state
      }
    }
  }
}