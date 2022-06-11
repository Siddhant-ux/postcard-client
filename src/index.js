import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import './index.css';

import App from './App';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

//you should start by wrapping your entire application in a <Provider> component to make the store available throughout the component tree

ReactDom.render(
<Provider store={store}>
<App />
</Provider>,
 document.getElementById('root'));