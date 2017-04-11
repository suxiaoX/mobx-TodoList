import React,{Component} from 'react';
import {observer} from 'mobx-react';
import {observable,expr} from 'mobx';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

@observer
export default class TodoItem extends Component{
  @observable editText = "";

  handleSubmit = (event) =>{

    event.preventDefault();

    var val = this.editText.trim();
    if (val) {
      this.props.todo.setTilte(val);
      this.editText = val;
    }else{
      this.handleDestroy();
    };
    this.props.viewStore.todoBeingEdited = null;
  };

  handleDestroy = () => {
    this.props.todo.destroy();
    this.props.viewStore.todoBeingEdited = null;
  };

  handleEdit = () => {
    const todo = this.props.todo;
    this.props.viewStore.todoBeingEdited = todo;
    this.editText = todo.title;
  };

  handleKeyDown = (event) => {
    if (event.which = ESCAPE_KEY){
      this.editText = this.props.todo.title;
      this.props.viewStore.todoBeingEdited = null;
    }else if(event.which = ENTER_KEY){
      this.handleSubmit(event);
    }
  };

  handleChange = (event) => {
    this.editText = event.target.value;
  };

  handleToggle = () => {
    this.props.todo.toggle();
  };

  render(){
    return(
      <li classname={[todo.completed ? 'completed' : '',
      expr( ()=> todo === viewStore.todoBeingEdited ? "editing" : "" )].join(' ')
      }>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={this.handleToggle}
          />
          <label onDoubleClick={this.handleEdit}>
            {todo.title}
          </label>
          <button className="destroy" onClick={this.handleDestroy} />
        </div>
        <input
          type="text"
          ref="editField"
          className="edit"
          value={this.editText}
          onBlur={this.handleSubmit}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </li>
    )
  }
};


TodoItem.propTypes = {
  todo:React.PropTypes.object.isRequired,
  viewStore:React.PropTypes.object.isRequired
}