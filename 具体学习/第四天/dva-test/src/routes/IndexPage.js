import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';

function IndexPage(props) {
  console.log('props', props.example)
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
        <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
      </ul>

      <div>
        {
          props.example.loading? '加载中...' : ''
        }
      </div>
      <h1>
        { props.example.isLoading? '欢迎您' : '未登录' }
      </h1>
      <button onClick={ () => props.dispatch({ type: 'example/fetch' })}>
        登录
      </button>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect((state) => {
  return {
    example: state.example
  }
})(IndexPage);
