import Todo from '../model/todo-model.js';

// Create a new todo
export async function addTodo(req, res) {
  const { title, description } = req.body;
  try {
  const newTodo = new Todo({...req.body});
    await newTodo.save()
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo', error: error.message });
  }
}

// Get all todos
export async function getAllTodos(req, res) {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos', error: error.message });
  }
}

export const updateTaskStatus = async (req, res) => {
  const taskId = req.params.id;
  const { newStatus } = req.body;
  try {
    const updatedTask = await Todo.findByIdAndUpdate(
      taskId,
      { status: newStatus },
      { new: true }
    );
    
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task status:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export async function updateTodo(req, res) {
  const taskId = req.params.id;
  const { title, description } = req.body;

  try {
    const updatedTask = await Todo.findByIdAndUpdate(
      taskId,
      { title, description },
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Error updating task' });
  }
}

// Delete a task
export async function deleteTodo(req, res) {
  const taskId = req.params.id;

  try {
    await Todo.findByIdAndDelete(taskId);
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task' });
  }
}
