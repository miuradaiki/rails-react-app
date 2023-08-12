import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import styled from 'styled-components';
import { AiFillEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';

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

  const SearchAndButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  `

  const SearchForm = styled.input`
    font-size: 20px;
    width: 100%;
    height: 40px;
    margin: 10px 0;
    padding: 10px;
  `

  const RemoveAllButton = styled.button`
    width: 16%;
    height: 40px;
    background: #f54242;
    border: none;
    font-weight: 500;
    margin-left: 10px;
    padding: 5px 10px;
    border-radius: 3px;
    color: #fff;
    cursor: pointer;
  `

  const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 7px auto;
    padding: 10px;
    font-size: 25px;
  `

  const CheckedBox = styled.div`
    display: flex;
    align-items: center;
    margin: 0 7px;
    color: green;
    cursor: pointer;
  `

  const UncheckedBox = styled.div`
    display: flex;
    align-items: center;
    margin: 0 7px;
    cursor: pointer;
  `

  const EditButton = styled.span`
    display: flex;
    align-items: center;
    margin: 0 7px;
    `

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
      <div className="body">
        <h1>Todo List</h1>
        <div>
          <input
            className="search-form"
            type="text"
            placeholder="Search todo..."
            onChange={(event) => {
              setSearchName(event.target.value);
            }}
          />
          <RemoveAllButton onClick={removeAllTodos}>
            Remove All
          </RemoveAllButton>
        </div>
        <div>
          {todos.filter((val) => {
            if (searchName === "") {
              return val;
            } else if (val.name.toLowerCase().includes(searchName.toLowerCase())) {
              return val;
            }
          }).map((val, key) => (
            <Row key={key}>
              {val.is_completed ? (
                <CheckedBox>
                  <ImCheckboxChecked onClick={() => updateIsCompleted(key, val)} />
                </CheckedBox>
              ) : (
                <UncheckedBox>
                  <ImCheckboxUnchecked onClick={() => updateIsCompleted(key, val)} />
                </UncheckedBox>
              )}
              <div>
                {val.name}
              </div>
              <Link to={"/todos/" + val.id + "/edit"}>
                <EditButton>
                  <AiFillEdit />
                </EditButton>
              </Link>
            </Row>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
