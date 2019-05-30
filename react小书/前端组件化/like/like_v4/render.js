window.onload = function () {

  // 传入HTML字符串 返回DOM结构
  const createDOMFromStrig = (domString) => {
    const div = document.createElement('div')
    div.innerHTML = domString
    return div
  }

  class LikeButton {
    /* constructor () {
      this.state = {
        isLiked: false
      }
    }
    setState (state) {
      this.state = state
      this.el = this.render()
      console.log(this.el)
    }
    changeLikeText () {
      this.setState({
        isLiked: !this.state.isLiked
      })
    }
    render () {
      //  传入HTML， 获取DOM
      this.el = createDOMFromStrig(`
        <button class='like-button'>
          <span class='like-text'>
            ${this.state.isLiked? '取消' : '点赞'}
          </span>
          <span>👍</span>
        </button>
      `)
      this.el.addEventListener('click', this.changeLikeText.bind(this))
      // 返回El
      return this.el
    } */
    constructor () {
      this.state = { isLiked: false }
    }

    setState (state) {
      const oldEl = this.el
      this.state = state
      this.el = this.render()
      if (this.onStateChange) {
        this.onStateChange(oldEl, this.el)
      }
    }

    changeLikeText () {
      this.setState({
        isLiked: !this.state.isLiked
      })
    }

    render () {
      this.el = createDOMFromStrig(`
        <button class='like-btn'>
          <span class='like-text'>${this.state.isLiked ? '取消' : '点赞'}</span>
          <span>👍</span>
        </button>
      `)
      this.el.addEventListener('click', this.changeLikeText.bind(this), false)
      return this.el
    }
  }
  const wrapper = document.querySelector('.wrapper')

  const likeButton1 = new LikeButton()
  wrapper.appendChild(likeButton1.render())
  likeButton1.onStateChange = (oldEl, newEl) => {
    wrapper.insertBefore(newEl, oldEl)
    wrapper.removeChild(oldEl)
  }

/*   const likeButton2 = new LikeButton()
  wrapper.appendChild(likeButton2.render()) */
}