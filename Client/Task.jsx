import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import axios from 'axios';

const Task = ({ task, index, handleEditTask, handleDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    if (editedTitle.trim() === '') return; // Handle empty title
    try {
      await axios.put(`https://breezy-momentous-message.glitch.me/todos/${task._id}`, {
        title: editedTitle,
        description: editedDescription,
      });
      setIsEditing(false);
      handleEditTask({ ...task, title: editedTitle, description: editedDescription });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`https://breezy-momentous-message.glitch.me/todos/${task._id}`);
      handleDeleteTask(task._id); // Notify parent component to update task
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-4 mb-4 rounded shadow"
        >
          {isEditing ? (
            // Edit mode
            <div>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="border p-1 mb-2 rounded text-gray-800 w-full" // Adjusted width
                placeholder="Title" // Added placeholder
              />
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="border p-1 mb-2 rounded text-gray-800 w-full" // Adjusted width
                placeholder="Description" // Added placeholder
              />
              <div className="flex justify-end"> {/* Align buttons to the right */}
                <button
                  onClick={handleSaveClick}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            // View mode
            <div>
              <h3 className="text-lg font-bold mb-2 text-gray-800">{task.title}</h3>
              <p className="text-gray-600 font-semibold mb-2">{task.description}</p>
              <p className="text-gray-600 mb-4">{task.status}</p>
              <div className="flex flex-wrap items-center">
                <button
                  onClick={handleEditClick}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-2 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mb-2"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Task;