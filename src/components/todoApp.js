import React,{Component} from 'react';
import {observer} from 'mobx-react';

import TodoEntry from './todoEntry';
import TodoOverview from './todoOverview';
import TodoFooter from './todoFooter';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';

@observer
export default class TodoApp extends Component{
  render(){
    const {todoStore, viewStore} = this.props;
    return(
      <div>
        <DevTool />
        <header>
          <h1>todos</h1>
          <TodoEntry todoStore={todoStore} />
        </header>
        <TodoOverview todoStore={todoStore} viewStore={viewStore} />
        <TodoFooter viewStore={viewStore} todoStore={todoStore} />
      </div>
    )
  }
  componentDidMount(){
    if (__CLIENT__) {
      var { Router } = require('director/build/director');
      var viewStore = this.props.viewStore;
      var router = Router({
        '/': function() { viewStore.todoFilter = ALL_TODOS; },
        '/active': function() { viewStore.todoFilter = ACTIVE_TODOS; },
        '/completed': function() { viewStore.todoFilter = COMPLETED_TODOS; }
      });
      router.init('/');
    }
  }
};

TodoApp.propTypes = {
  viewStore: React.PropTypes.object.isRequired,
  todoStore: React.PropTypes.object.isRequired
};