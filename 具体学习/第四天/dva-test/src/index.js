import dva from 'dva';
import './index.css';

// 1. Initialize 启动
const app = dva();

// 2. Plugins  使用一些插件
// app.use({});

// 3. Model  model 层
app.model(require('./models/example').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
