import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

interface Todo {
  id: number;
  name: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/todos')
      .then(res => {
        console.log(res.data);
        setTodos(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const removeAllTodos = () => {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      axios.delete('http://localhost:3001/api/v1/todos/destroy_all')
      .then(res => {
        setTodos([])
      })
      .catch(e => {
        console.log(e)
      })
    }
  }

  // const updateIsCompleted = (index, val) => {
  //   var data = {
  //     id: val.id,
  //     name : val.name,
  //     is_completed: !val.is_completed
  //   }
  //   axios.patch(`/api/v1/todos/${val.id}`, data)
  //   .then(res => {
  //     const newTodos = [...todos]
  //     newTodos[index].is_completed = res.data.is_completed
  //     setTodos(newTodos)
  //   })
  // }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="">
        {todos.map(todo => (
          <div key={todo.id}>
            <p>ID: {todo.id}</p>
            <p>Name: {todo.name}</p>
            <p>Completed: {todo.is_completed ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
