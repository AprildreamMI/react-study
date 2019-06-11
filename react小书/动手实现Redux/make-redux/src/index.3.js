
// 设置一些状态
const appState = {
  title: {
    text: 'React.js 小书',
    color: 'red',
  },
  content: {
    text: 'React.js 小书内容',
    color: 'blue'
  }
}

// 渲染函数
function renderApp (appState) {
  renderTitle(appState.title)
  renderContent(appState.content)
}

function renderTitle (title) {
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = title.text
  titleDOM.style.color = title.color
}

function renderContent (content) {
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = content.text
  contentDOM.style.color = content.color
}

// 必须通过此函数进行状态的修改
function stateChanger (state, action) {
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      state.title.text = action.text
      break
    case 'UPDATE_TITLE_COLOR':
      state.title.color = action.color
      break
    default:
      break
  }
}

// 返回 state 和 dispatch 合集
function createStore (state, stateChanger) {
  // 新建一个函数集合
  const listeners = []
  // 调用此函数 传入一个函数
  const subscribe = (listener) => {
    console.log(listener)
    listeners.push(listener)
  }
  const getState = () => state
  const dispatch = (action) => {
    stateChanger(state, action)
    // 循环调用函数数组中的函数
    listeners.forEach((listener) => listener())
  }
  return { getState, dispatch, subscribe }
}

// 创建一个state 和 dispath 集合
const store = createStore(appState, stateChanger)
// 传入一个函数去调用渲染函数
store.subscribe(() => renderApp(store.getState()))

// 首次进行渲染
renderApp(store.getState())

// 接下来不需要再进行渲染
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色
