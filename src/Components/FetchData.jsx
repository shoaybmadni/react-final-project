import React, {useState, useEffect} from 'react';
import axios from 'axios';

const FetchData = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => {
        localStorage.setItem('tasks', JSON.stringify(res.data))
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    const task = JSON.parse(localStorage.getItem('tasks'));
    if (task) {
      setTodos(task)
    }
  }, [])

  return (
    <>
      
    </>
  )
}

export default FetchData;