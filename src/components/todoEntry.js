import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';


const ENTER_KEY = 13;

@observer
export default class TodoEntry extends Component{
  handleNewTodoKeyDown = (event) => {
    if (event.keyCode != ENTER_KEY){
      return;
    };

    event.preventDefault();

    var val = ReactDom.findDOMNode(this.refs.newField).value.trim();

    if (val) {
      this.props.todoStore.addTodo(val);
    }
  }

  render(){
    return(
      <input
        type="text"
        ref="newField"
        className="new-todo"
        placeholder="请输入标题"
        onKeyDown={this.handleNewTodoKeyDown}
        aotuFocus={true}
      />
    )
  }
}