import React from 'react'

const users = [
  { username: 'Jerry', age: 21, gender: 'male' },
  { username: 'Tomy', age: 22, gender: 'male' },
  { username: 'Lily', age: 19, gender: 'female' },
  { username: 'Lucy', age: 20, gender: 'female' }
]

function User (props) {
  const { user } = props
  // console.log(this)
  return (
    <div>
      <div>姓名：{ user.username }</div>
      <div>年龄：{ user.age }</div>
      <div>性别：{ user.gender }</div>
    </div>
  )
}

function Index () {
  return (
    <div>
      { users.map((user, index) => <User user={ user } key={ index } />) }
    </div>
  )
}

export default Index