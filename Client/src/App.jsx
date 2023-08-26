import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './components/Column';
import TaskForm from './components/TaskForm';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    fetchData();
  }, []);
  
  setTimeout(() => {
    setIsLoading(false);
  }, 3000);


  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://breezy-momentous-message.glitch.me/todos');
      const data = response.data;
      setIsLoading(false);
      setTasks(data); // Set all tasks
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
  
    const sourceStatus = result.source.droppableId;
    const destinationStatus = result.destination.droppableId;
  
    if (sourceStatus !== destinationStatus) {
      const taskId = result.draggableId;
      const updatedTasks = tasks.map(task => {
        if (task._id === taskId) {
          return { ...task, status: destinationStatus };
        }
        return task;
      });
      setIsLoading(true);
      try {
        // Update task status in backend
        await axios.put(`https://breezy-momentous-message.glitch.me/todo/${taskId}`, { newStatus: destinationStatus });
        setTasks(updatedTasks);
        setIsLoading(false);
      } catch (error) {
        console.error('Error updating task status:', error);
        setIsLoading(false)
      }
    }
  };
  

  const handleAddTask = (addedTask) => {
    const isTaskAlreadyAdded = tasks.some(task => task._id === addedTask._id);
    if (!isTaskAlreadyAdded) {
      setTasks([...tasks, addedTask]);
    }
  };
  

  const handleEditTask = (editedTask) => {
    const updatedTasks = tasks.map(task => {
      if (task._id === editedTask._id) {
        return editedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task._id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <>
    <Navbar/>
    <div className="container mx-auto py-8 px-4 sm:px-6 md:px-8">
      <h1 className="text-3xl font-semibold mb-4">View and add Tasks</h1>
      <TaskForm onAddTask={handleAddTask} />
      <br />
      {isLoading ? <Loading message="Updating tasks..." /> : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Column
              title="To Do"
              tasks={tasks.filter(task => task.status === 'To Do')}
              status="To Do"
              handleEditTask={handleEditTask}
              handleDeleteTask={handleDeleteTask}
            />
            <Column
              title="Doing"
              tasks={tasks.filter(task => task.status === 'Doing')}
              status="Doing"
              handleEditTask={handleEditTask}
              handleDeleteTask={handleDeleteTask}
            />
            <Column
              title="Done"
              tasks={tasks.filter(task => task.status === 'Done')}
              status="Done"
              handleEditTask={handleEditTask}
              handleDeleteTask={handleDeleteTask}
            />
          </div>
        </DragDropContext>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default App;
