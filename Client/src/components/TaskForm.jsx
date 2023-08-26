import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://breezy-momentous-message.glitch.me/todos', { title, description });
      onAddTask(response.data);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-md shadow bg-gray-100">
      <h2 className="text-lg font-semibold mb-2">Add Task</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded px-2 py-1 mb-2 w-full"
        placeholder="Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border rounded px-2 py-1 mb-2 w-full"
        placeholder="Description"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-blue-600 transform hover:scale-105"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
