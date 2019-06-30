// 默认数据 空对象
const defaultState = {
  inputValue: '123',
  list: [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.'
  ]
}

// 存储如何对数据进行操作
/**
 * state 存储的数据 [ 上一次传递过去的数据 ]
 */
export default (state = defaultState, action) => {
  // 接受action 处理数据
  if (action.type === 'change_input_value') {
    // 不能直接修改state
    const newState = JSON.parse(JSON.stringify(state))
    // 会拿新的state数据，去替换旧的state数据
    newState.inputValue = action.inputValue
    return newState
  }
  if (action.type === 'add_item') {
    const newState = JSON.parse(JSON.stringify(state))
    newState.list.push(action.inputValue)
    return newState
  }
  if (action.type === 'delete_item') {
    const newState = JSON.parse(JSON.stringify(state))
    newState.list.splice(action.index, 1)
    return newState
  }
  return state
}