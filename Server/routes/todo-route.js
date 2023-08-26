import express, { Router } from 'express';


import { addTodo, getAllTodos, updateTaskStatus, updateTodo, deleteTodo } from '../controller/todo-controller.js';

const route = express.Router();


route.post('/todos', addTodo)
route.get('/todos', getAllTodos);
route.put('/todo/:id', updateTaskStatus);
route.put('/todos/:id', updateTodo);
route.delete('/todos/:id', deleteTodo);


export default route;