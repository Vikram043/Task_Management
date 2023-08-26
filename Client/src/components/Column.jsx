import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

const Column = ({ title, tasks, status, handleEditTask, handleDeleteTask }) => {
  return (
    <div className="p-4 border rounded-md shadow bg-black text-white">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <Droppable droppableId={status}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="grid gap-4"
          >
            {tasks.map((task, index) => (
              <Task
                key={task._id}
                task={task}
                index={index}
                handleEditTask={handleEditTask}
                handleDeleteTask={handleDeleteTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
