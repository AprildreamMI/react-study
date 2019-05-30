window.onload = function () {

  // 传入HTML字符串 返回DOM结构
  const createDOMFromStrig = (domString) => {
    const div = document.createElement('div')
    div.innerHTML = domString
    return div
  }

  class LikeButton {
    constructor () {
      this.state = {
        isLiked: false
      }
    }
    changeLikeText () {
      console.log(1)
      const likeText = this.el.querySelector('.like-text')
      this.state.isLiked = !this.state.isLiked
      console.log(this.state)
      likeText.innerHTML = this.state.isLiked? '取消' : '点赞'
    }
    render () {
      //  传入HTML， 获取DOM
      this.el = createDOMFromStrig(`
        <button class='like-button'>
          <span class='like-text'>点赞</span>
          <span>👍</span>
        </button>
      `)
      this.el.addEventListener('click', this.changeLikeText.bind(this))
      // 返回El
      return this.el
    }
  }
  const wrapper = document.querySelector('.wrapper')

  const likeButton1 = new LikeButton()
  wrapper.appendChild(likeButton1.render())

  const likeButton2 = new LikeButton()
  wrapper.appendChild(likeButton2.render())
}