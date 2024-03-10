import express from 'express';
import { renderToString } from 'react-dom/server';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import Routes from '../routes';
import { Provider } from 'react-redux';
import { getStore } from '../store';
import { matchRoutes, renderRoutes } from 'react-router-config';

/**
 * {1}，创建一个 express 实例对象
 * {2}，开启一个静态资源服务，监听 public 目录，还记得客户端的打包文件就放到了 public 目录了把，这里通过监听，我们就可以这样 localhost:3000/index.js 访问该静态资源
 * {3}，把 React 组件通过 renderToString 方法生成 HTML
 * {4}，当用户访问 localhost:3000 时便会返回 res.send 中的 HTML 内容，该 HTML 中把 React 生成的 HTML 片段也插入进去一同返回给用户了，这样就实现了服务端渲染。通过 <script src="/index.js"></script> 这段脚本加载了客户端打包后的 React 代码，这样就实现了客户端渲染，因此一个简单同构项目就这样实现了。
 */
const app = express(); // {1}
app.use(express.static('public')); // {2}
const render = (req, res) => {
  const context = {
    css: [],
  };
  const store = getStore();
  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    const component = route.component;
    return component.getInitialData ? component.getInitialData(store) : null;
  });
  Promise.all(promises).then(() => {
    //{3}
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.path} context={context}>
          {renderRoutes(Routes)}
        </StaticRouter>
      </Provider>
    );
  console.log('sssss', context);
    const css = context.css.length ? context.css.join('\n') : '';
    res.send(`    
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>React SSR</title>
          <style>${css}</style>
        </head>
        <body>
          <div id="root">${content}</div>
          <script>window.INITIAL_STATE=${JSON.stringify(
            store.getState()
          )}</script>
          <script src="/index.js"></script>
        </body>
      </html>
    `);
  });
};

app.get('*', function (req, res) {
  // {4}
  render(req, res);
});

app.listen(3000);
