import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';

interface Todo {
  id: number;
  name: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchName, setSearchName] = useState('');

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

  const updateIsCompleted = (index: number, val: Todo) => {
    var data = {
      id: val.id,
      name : val.name,
      is_completed: !val.is_completed
    }
    axios.patch(`http://localhost:3001/api/v1/todos/${val.id}`, data)
    .then(res => {
      const newTodos = [...todos]
      newTodos[index].is_completed = res.data.is_completed
      setTodos(newTodos)
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="">
        <div>
          <input
            type="text"
            placeholder="Search todo..."
            onChange={(event) => {
              setSearchName(event.target.value);
            }}
          />
          <button onClick={removeAllTodos}>
            Remove All
          </button>
        </div>
      </div>
      <div>
        {todos.filter((val) => {
          if (searchName === "") {
            return val;
          } else if (val.name.toLowerCase().includes(searchName.toLowerCase())) {
            return val;
          }
        }).map((val, key) => (
          <div key={key}>
            {val.is_completed ? (
              <div>
                <ImCheckboxChecked onClick={() => updateIsCompleted(key, val)} />
              </div>
            ) : (
              <div>
                <ImCheckboxUnchecked onClick={() => updateIsCompleted(key, val)} />
              </div>
            )}
            <div>
              {val.name}
            </div>
            {/* リンクと編集 */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
