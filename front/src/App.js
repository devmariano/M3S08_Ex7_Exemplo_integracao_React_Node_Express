import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Função para carregar as tarefas do servidor
  const loadTasks = async () => {
    const response = await axios.get('http://localhost:5000/api/tasks');
    setTasks(response.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Função para adicionar uma nova tarefa
  const addTask = async () => {
    if (newTask.trim() === '') return;

    await axios.post('http://localhost:5000/api/tasks', { task: newTask });
    loadTasks();
    setNewTask('');
  };

  // Função para excluir uma tarefa
  const deleteTask = async (index) => {
    await axios.delete(`http://localhost:5000/api/tasks/${index}`);
    loadTasks();
  };

  return (
    <div className="App">
      <h1>Lista de Tarefas</h1>
      <div>
        <input
          type="text"
          placeholder="Digite uma nova tarefa"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Adicionar Tarefa</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => deleteTask(index)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
