import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../routes';
import { Provider } from 'react-redux';
import { getClientStore } from '../store';
import { renderRoutes } from 'react-router-config';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  );
}

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider store={getClientStore()}>
        <BrowserRouter>{renderRoutes(Routes)} </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
};

ReactDom.hydrate(<App />, document.getElementById('root'));
// ReactDom.render(<App />, document.getElementById('root'));
// const root = ReactDOM.createRoot(document.getElementById('app'));
// // v18 的新方法
// root.render(<App />)
