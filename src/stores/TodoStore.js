import {observable,computed,reaction} from 'mobx';
import TodoModel from '../models/TodoModel';
import * as Utils from '../utils';

export default class TodoStore{
  @observable todos = [];

  @computed get activeTodoCount(){
    return this.todos.reduce(
      (sum,todo) => sum + (todo.completed ? 0 : 1)
    )
  };

  @computed get completedCount(){
    return this.todos.length - this.activeTodoCount
  };

  subscribeServerToStore(){
    reaction(
      () => this.toJS,
      todos => fetch('/api/todos',{
        method:'post',
        body:JSON.stringify({todos}),
        headers:new Headers({ 'Content-Type':'application/json' })
      })
    )
  };

  subscribeLocalstorageToStore(){
    reaction(
      () => toJS(),
      todos => localStorage.setItem('mobx-todos',JSON.stringify({todos}))
    )
  };

  addTodo(title){
    this.todos.push(new TodoModel(this,Utils.uuid(),title,false))
  };

  toggleAll(checked){
    this.todos.forEach(
      todo => todo.completed = checked
    )
  };

  clearCompleted(){
    this.todos = this.todos.filter(
      todo => !todo.completed
    )
  };

  toJS(){
    return this.todos.map(todo => todo.toJS())
  };

  static fromJS(array){
    const todoStore = new TodoStore();
    todoStore.todos = array.map(item => todoStore.toJS(todoStore,item));
    return todoStore;
  };

}