/**
 * Created by shunshun on 2017/4/11.
 */
import 'todomvc-common';
import React from 'react';

import TodoStore from './stores/TodoStore';
import ViewStore from './stores/ViewStore';
import TodoApp from './components/todoApp.js';
import ReactDOM from 'react-dom';

const initialState = window.initialState && JSON.stringify(window.initialState) || {};

var todoStore = TodoStore.fromJS(initialState.todos || []);
var ViewStore = new ViewStore();

todoStore.subscribeServerToStore();

ReactDom.render(
  <TodoApp viewStore={ViewStore} todoStore={todoStore}/>,
  document.getElementById('todoapp')
);

if (module.hot){
  module.hot.accept('./components/todoApp', () =>{
    var newTodoApp = require('./components/todoApp').default;
    ReactDOM.render(
      <newTodoApp viewStore={ViewStore} todoStore={todoStore}/>,
      document.getElementById('todoapp')
    );
  });
};