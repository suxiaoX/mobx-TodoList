import React,{Component} from 'react';
import {observer} from 'mobx-react';
import { ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';

import TodoItem from './todoItem';


@observer
export default class TodoOverview extends Component{

  getVisibleTodos(){
    return this.props.todoStore.todos.filter(
      todo => {
        switch (this.props.viewStore.todoFilter){
          case ACTIVE_TODOS:
            return !todo.completed;
          case COMPLETED_TODOS:
            return todo.completed;
          default:
            return true;
        }
      }
    )
  };

  toggleAll = ()=> {
    var checked = event.target.checked;
    this.props.todoStore.toggleAll(checked);
  };

  render(){
    const {todoStore,viewStore} = this.props;
    if (todoStore.todos.length === 0) return null;
    return(
      <section>
        <input
          className="toggle-all"
          type="checkbox"
          onChange={this.toggleAll}
          checked={todoStore.activeTodoCount === 0}
        />
        <ul className="todo-list">
          {
            this.getVisibleTodos().map(todo => (
              <TodoItem todo={todo} viewStore={viewStore} />
            ))
          }
        </ul>
      </section>
    )
  }
};
TodoOverview.propTypes = {
  viewStore: React.PropTypes.object.isRequired,
  todoStore: React.PropTypes.object.isRequired
}