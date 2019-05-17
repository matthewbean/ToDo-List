import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Table, Checkbox, Button, Icon } from "semantic-ui-react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleNewTodoKeyDown = this.handleNewTodoKeyDown.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleToggleAll = this.handleToggleAll.bind(this);
    this.handleClearCompleted = this.handleClearCompleted.bind(this);

    this.state = {
      todos: [
        { title: "Learn React", completed: false },
        { title: "Learn Redux", completed: false },
        { title: "Learn React Native", completed: false }
      ],
      newTodo: ""
    };
  }

  handleToggleAll() {
    const [...todos] = this.state.todos;
    const allToggled = todos.every(todo => todo.completed);
    const toggledTodos = todos.map(todo => ({
      ...todo,
      completed: !allToggled
    }));
    this.setState({ todos: toggledTodos });
  }
  handleAddClick(event) {
    if (this.state.todos.length >= 10) {
      return;
    }
    const { newTodo, todos } = this.state;
    const value = newTodo.trim();
    if (value) {
      this.setState({
        todos: [...todos, { title: value, completed: false }],
        newTodo: ""
      });
    }
  }
  handleDelete(todo, i) {
    const { todos } = this.state;
    const todosDelete = todos.filter((todo, index) => index !== i);

    this.setState({ todos: todosDelete });
  }

  handleTodoClick(todo, index) {
    const { completed } = todo;
    const [...todos] = this.state.todos;
    todos[index] = { ...todo, completed: !completed };
    this.setState({ todos });
  }
  handleInputChange(event) {
    const value = event.target.value;
    this.setState({ newTodo: value });
  }
  handleClearCompleted = () => {
    const { todos } = this.state;
    const incompleteTodos = todos.filter(todo => !todo.completed);
    this.setState({ todos: incompleteTodos });
  };
  handleNewTodoKeyDown(event) {
    if (this.state.todos.length >= 10) {
      // don't allow more than 10 todos
      return;
    }

    if (event.keyCode !== 13) {
      // 13 is enter key
      return;
    }
    event.preventDefault();

    const { newTodo, todos } = this.state; //Destructure
    const value = newTodo.trim(); //Get rid of white space at beginning and end
    if (value) {
      //Check the value isn't blank
      this.setState({
        todos: [
          ...todos, //Copy the current todos in the array
          { title: value, completed: false } //Create a new array object
        ],
        newTodo: "" //Clear the input field
      });
    }
  }

  render() {
    const { todos, newTodo } = this.state;
    const allToggled = todos.every(todo => todo.completed);
    return (
      <div className="app">
        <div className="todo-container">
          <label htmlFor="new-todo">Add To-Do</label>
          <input
            className="new-todo"
            id="new-todo"
            placeholder="new item"
            autoFocus
            value={this.state.newTodo}
            onChange={this.handleInputChange}
            onKeyDown={this.handleNewTodoKeyDown}
          />
          <Button animated="fade" onClick={this.handleAddClick}>
            <Button.Content visible>add</Button.Content>
            <Button.Content hidden>
              <Icon name="plus" />
            </Button.Content>
          </Button>
          {todos.length === 0 ? (
            <Table>
              <Table.Header>
                <Table.Row style={{ textAlign: "center" }}>
                  <Table.HeaderCell>All Done!!</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
            </Table>
          ) : (
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    <Checkbox
                      checked={allToggled}
                      onChange={this.handleToggleAll}
                    />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.state.todos.map((todo, i) => (
                  <Table.Row key={i} positive={todo.completed}>
                    <Table.Cell>
                      <Checkbox
                        checked={todo.completed}
                        onChange={() => this.handleTodoClick(todo, i)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      {todo.title}
                      <Button
                        color="red"
                        icon="trash"
                        floated="right"
                        compact
                        size="small"
                        onClick={() => this.handleDelete(todo, i)}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Footer fullWidth>
                <Table.Row>
                  <Table.HeaderCell colSpan="2">
                    <Button size="small" onClick={this.handleClearCompleted}>
                      Clear Completed
                    </Button>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          )}
        </div>
      </div>
    );
  }
}

export default App;
