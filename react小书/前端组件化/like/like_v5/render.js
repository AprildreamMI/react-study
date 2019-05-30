window.onload = function () {

  // 传入HTML字符串 返回DOM结构
  const createDOMFromStrig = (domString) => {
    const div = document.createElement('div')
    div.innerHTML = domString
    return div
  }

  const mount = (component, wrapper) => {
    console.log(component)
    wrapper.appendChild(component._renderDOM())
    component.onStateChange = (oldEl, newEl) => {
      wrapper.insertBefore(newEl, oldEl)
      wrapper.removeChild(oldEl)
    }
  }

  class Component {
    setState (state) {
      const oldEl = this.el
      this.state = state
      // 重新生成
      this._renderDOM()
      // 更新外部元素
      if (this.onStateChange) {
        this.onStateChange(oldEl, this.el)
      }
    }

    _renderDOM () {
      this.el = createDOMFromStrig(this.render())
      if (this.onClick) {
        this.el.addEventListener('click', this.onClick.bind(this))
      }

      return this.el
    }
  }

  class LikeButton extends Component {
    constructor () {
      super()
      this.state = {
        isLiked: false
      }
    }

    onClick () {
      this.setState({
        isLiked: !this.state.isLiked
      })
    }

    render () {
      return `
              <button class='like-btn'>
                <span class='like-text'>${this.state.isLiked ? '取消' : '点赞'}</span>
                <span>👍</span>
              </button>
            `
    }
  }
  
  const wrapper = document.querySelector('.wrapper')
  mount(new LikeButton(), wrapper)
}