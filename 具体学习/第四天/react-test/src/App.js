import React from 'react';
import { connect } from 'react-redux'
import logo from './logo.svg';
import * as userAction from './actions/user'
import './App.css';

class App extends React.Component {
  render () {
    console.log('传入的props', this.props)

    const { user } = this.props

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            {
              user.isLoading ? 
                '欢迎您'
                :
                '未登录'
            }
          </div>
          <div>
            {
              user.loading? '加载中...' : ''
            }
          </div>
          <button onClick={ e=> {
            this.props.dispatch(
              userAction.login({
                account: 'test',
                password: '123'
              })
            )
          } }>
            登录
          </button>
        </header>
      </div>
    );
  }
}

// 一个页面可能不需要用到这么多的全局数据
// 从所有的仓库数据中拿到所需要的数据
// function mapStateToProps (state) {
//   return {
//     state: state.user
//   }
// }

/**
 * 运行后会生成一个新的方法 把APP传入新方法中
 */
// export default connect(mapStateToProps)(App);

// 这里的命名决定了在props中的取值名字
export default connect((state) => {
  return {
    user: state.user
  }
})(App)
