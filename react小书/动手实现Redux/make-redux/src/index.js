
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
function renderApp (newAppState, oldAppState = {}) {
  if (newAppState === oldAppState) return // 数据没有变化就不渲染了
  console.log('render app...')
  renderTitle(newAppState.title, oldAppState.title)
  renderContent(newAppState.content, oldAppState.content)
}

function renderTitle (newTitle, oldTitle = {}) {
  if (newTitle === oldTitle) return // 数据没有变化就不渲染了
  const titleDOM = document.getElementById('title')
  console.log('render title...')
  titleDOM.innerHTML = newTitle.text
  titleDOM.style.color = newTitle.color
}

function renderContent (newContent, oldContent = {}) {
  if (newContent === oldContent) return // 数据没有变化就不渲染了
  console.log('render content...')
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = newContent.text
  contentDOM.style.color = newContent.color
}

// 必须通过此函数进行状态的修改
function stateChanger (state, action) {
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      return {
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      }
    case 'UPDATE_TITLE_COLOR':
      return {
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      }
    default:
      return state
  }
}

// 返回 state 和 dispatch 合集
function createStore (state, stateChanger) {
  // 新建一个函数集合
  const listeners = []
  // 调用此函数 传入一个函数
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    state = stateChanger(state, action)
    // 循环调用函数数组中的函数
    listeners.forEach((listener) => listener())
  }
  return { getState, dispatch, subscribe }
}

// 创建一个state 和 dispath 集合
const store = createStore(appState, stateChanger)
// 缓存旧的state
let oldState = store.getState()
// 传入一个函数去调用渲染函数
store.subscribe(() => {
  // 数据发生变化 获取新的state
  const newState = store.getState()
  renderApp(newState, oldState)
  // 重新缓存state
  oldState = newState
})

// 首次进行渲染
renderApp(store.getState())

// 接下来不需要再进行渲染
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色
