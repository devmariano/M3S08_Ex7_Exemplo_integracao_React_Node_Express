const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importe o pacote 'cors'

const app = express();
const port = 5000;

// Middleware para análise de corpo JSON
app.use(bodyParser.json());

// Ative o CORS para permitir acesso de qualquer origem
app.use(cors());

// Simula um banco de dados simples (array)
let tasks = [];

// Rota para obter todas as tarefas
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Rota para adicionar uma nova tarefa
app.post('/api/tasks', (req, res) => {
  const newTask = req.body.task;
  tasks.push(newTask);
  res.json({ message: 'Tarefa adicionada com sucesso' });
});

// Rota para excluir uma tarefa
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((task, index) => index !== taskId);
  res.json({ message: 'Tarefa excluída com sucesso' });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});