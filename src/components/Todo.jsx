import React, { useState, useEffect } from 'react';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    document.body.style.backgroundColor = '#0f172a';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const addTodo = () => {
    if (input.trim() === '') return;
    setTodos([...todos, input]);
    setInput('');
  };

  const deleteTodo = (indexToDrop) => {
    const updatedTodos = todos.filter((_, index) => index !== indexToDrop);
    setTodos(updatedTodos);
  };

  return (
    <div style={{ 
      display: 'block', 
      clear: 'both', 
      margin: '30px auto', 
      padding: '25px', 
      maxWidth: '400px', 
      borderRadius: '12px', 
      background: '#1e293b', 
      color: '#ffffff', 
      textAlign: 'center',
      boxShadow: '0px 10px 25px rgba(0,0,0,0.5)',
      fontFamily: 'sans-serif'
    }}>
      <h2>Todo App</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Add a new task..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ 
            padding: '12px', 
            width: '65%', 
            marginRight: '10px', 
            border: '1px solid #475569', 
            borderRadius: '6px', 
            color: '#fff', 
            background: '#0f172a', 
            outline: 'none'
          }}
        />
        <button onClick={addTodo} style={{ 
          padding: '12px 18px', 
          cursor: 'pointer', 
          background: '#22c55e', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '6px', 
          fontWeight: 'bold'
        }}>
          Add
        </button>
      </div>

      <ul style={{ listStyleType: 'none', padding: 0, marginTop: '20px', textAlign: 'left' }}>
        {todos.map((todo, index) => (
          <li key={index} style={{ 
            padding: '12px', 
            background: '#0f172a', 
            marginBottom: '8px', 
            borderRadius: '6px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            border: '1px solid #334155' 
          }}>
            <span style={{ color: '#cbd5e1' }}>{todo}</span>
            <button onClick={() => deleteTodo(index)} style={{ 
              background: '#dc3545', 
              color: 'white', 
              border: 'none', 
              padding: '6px 12px', 
              cursor: 'pointer', 
              borderRadius: '4px',
              fontWeight: 'bold'
            }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      
      {todos.length === 0 && (
        <p style={{ color: '#94a3b8', marginTop: '20px', fontSize: '14px', fontStyle: 'italic' }}>
          No tasks available.
        </p>
      )}
    </div>
  );
}

export default Todo;