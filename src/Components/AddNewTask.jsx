import React, { useState, useEffect } from 'react';
import './AddNewTask.css';

const AddNewTask = () => {
  const [inputTodo, setInputTodo] = useState('');
  const [addTodo, setAddTodo] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    getLocalTodos();
  }, [])

  useEffect(() => {
    todoFilterHandler();
    saveLocalTodos();
  }, [addTodo, status]);


  const inputTodoHandler = (e) => {
    setInputTodo(e.target.value);
  }

  const addTodoHandler = () => {
    if (!inputTodo) {
      alert("Please enter a task");
    } else {
      setAddTodo([
        ...addTodo,
        {
          userId: 2,
          id: Math.random() * 10,
          title: inputTodo,
          completed: false
        }
      ]);
      setInputTodo('');
    }
  }

  const deleteTodoHandler = (id) => {
    setAddTodo(addTodo.filter((todo) => todo.id !== id));
  }

  const completeTodoHandler = (id) => {
    setAddTodo(addTodo.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        };
      }
      return todo;
    }));
  }

  const todoStatusHandler = (e) => {
    setStatus(e.target.value);
  }

  const todoFilterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(addTodo.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(addTodo.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(addTodo);
        break;
    }
  }

  const saveLocalTodos = () => {
    localStorage.setItem('tasks', JSON.stringify(addTodo))
  }

  const getLocalTodos = () => {
    if (localStorage.getItem('tasks') === null) {
      localStorage.setItem('tasks', JSON.stringify([]))
    } else {
      let localTodo = JSON.parse(localStorage.getItem('tasks'));
      console.log(localTodo)
      setAddTodo(localTodo);
    }
  }

  return (
    <div className="container">
      <div className="card-container">
        <div className="head-container">
          <h1 className="heading-1">TO-DO LIST</h1>
          <div className="select">
            <select name="todos" className="filter-todo" onChange={todoStatusHandler}>
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="uncompleted">Uncompleted</option>
            </select>
          </div>
        </div>
        <div className="input-card">
          <input
            type="text"
            placeholder="Create a new task"
            onChange={inputTodoHandler}
            value={inputTodo}
          />
          <button
            className="btn add-btn"
            onClick={addTodoHandler}
          >
            Add
          </button>
        </div>
        <div className="list-container">
          {filteredTodos.map((todo) => (
            <div className="task-card" key={todo.id}>
              <div className="task-div">
                <span className={`todo-text ${todo.completed ? "todo-completed" : ""}`}>{todo.title}</span>
              </div>
              <div className="btn-div">
                <button
                  className="btn"
                  onClick={() => completeTodoHandler(todo.id)}
                >
                  Complete
                </button>
                <button
                  className="btn"
                  onClick={() => deleteTodoHandler(todo.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddNewTask;