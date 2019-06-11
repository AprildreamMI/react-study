import React from 'react'

const cnText = {
  submit: '确认',
  cancel: '取消'
}
const enText = {
  submit: 'submit',
  cancel: 'cancel'
}
 
const LocaleContext = React.createContext(cnText);//创建一个Context 参数是默认值
class ChangeButton extends React.Component{
      constructor (props) {
          super(props);
          this.state = {
            locale: cnText
          }
      }
      handle = () => {
          const locale = this.state.locale === enText ? cnText : enText;
          this.setState({
            locale
          })
      }
      render () {
        return (// value 里面为传个子组件的数据
        <LocaleContext.Provider value = { this.state.locale } >
            <button  onClick = { this.handle } >切换语言</button>
            <App />
        </LocaleContext.Provider>
        );
      }
}
class App extends React.Component {
  constructor (props) {
      super(props);
      this.state = enText;
 
    }
    render  () {
       return (
          <LocaleContext.Consumer >
              { locale => (//locale 接受传过来的值，然后通过函数子组件渲染
                <div>
                    <button> { locale.submit } </button>
                    <button> { locale.cancel } </button>
                </div>
              )}
          </LocaleContext.Consumer>
       );
     }
}

export default ChangeButton