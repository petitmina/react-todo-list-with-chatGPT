import React, { useState, useEffect } from 'react';
import styles from './TodoList.module.css';
import Modal from './Modal';
// import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputPriority, setInputPriority] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    const savedCompletedTodos = localStorage.getItem('completedTodos');

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }

    if (savedCompletedTodos) {
      setCompletedTodos(JSON.parse(savedCompletedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
  }, [completedTodos]);

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = { text: inputValue, completed: false, priority: parseInt(inputPriority) };
      setTodos([...todos, newTodo]);
      setInputValue('');
      setInputPriority(0);
    }
  };

  const toggleTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);

    if (updatedTodos[index].completed) {
      const completedTodo = updatedTodos.splice(index, 1)[0];
      setCompletedTodos([...completedTodos, completedTodo]);
    } else {
      const uncompletedTodo = completedTodos.splice(index, 1)[0];
      setTodos([...todos, uncompletedTodo]);
    }
  };

  const removeTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const updatePriority = (index, priority) => {
    const updatedTodos = [...todos];
    updatedTodos[index].priority = priority;
    setTodos(updatedTodos);
  };

  const removeAllCompleted = () => {
    setCompletedTodos([]);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = (username, password) => {
    // 실제 로그인 로직을 구현합니다.
    // 로그인 성공 시 사용자 정보를 저장하고 모달을 닫습니다.
    setUser({ username: username });
    closeModal();
  };

  return (
    <div className={styles['todo-list-container']}>
      <h1>Todo List</h1>
      <ul className={styles['todo-list']}>
        {todos.map((todo, index) => (
          <li
            key={index}
            className={`${styles['todo-item']} ${
              todo.completed ? styles.completed : ''
            }`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(index)}
            />
            <span>{todo.text}</span>
            <input
              type="number"
              value={todo.priority}
              onChange={(e) => updatePriority(index, parseInt(e.target.value))}
              min={0}
              style={{ width: '40px' }}
            />
            <button onClick={() => removeTodo(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <div className={styles['input-container']}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Todo"
        />
        <input
          type="number"
          value={inputPriority}
          onChange={(e) => setInputPriority(parseInt(e.target.value))}
          placeholder="Priority"
          min={0}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <div className={styles['completed-todos-header']}>
        Completed Todos
        <button onClick={removeAllCompleted} className={styles['remove-all-button']}>
          Remove All
        </button>
      </div>
      <ul>
        {completedTodos.map((completedTodo, index) => (
          <li key={index} className={styles['completed-todo']}>
            <span>{completedTodo.text}</span>
          </li>
        ))}
      </ul>
      {user ? (
        <div className={styles['user-info']}>
          Logged in as: {user.username}
          <button className={styles['login-button']} onClick={() => setUser(null)}>Logout</button>
        </div>
      ) : (
        <button className={styles['login-button']}  onClick={openModal}>Login</button>
      )}

      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        handleLogin={handleLogin}
      />
    </div>
  );
}

export default TodoList;