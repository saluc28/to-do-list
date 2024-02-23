import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import SwipeUpIcon from '@mui/icons-material/SwipeUp';
import SwipeDownIcon from '@mui/icons-material/SwipeDown';
import "./assets/ToDoList.css"
import DoneIcon from '@mui/icons-material/Done';

interface Task {
  id: number;
  description: string;
}

const ToDoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  }

  const addTask = () => {
    if (newTask.trim() !== "") {
      const newTaskItem: Task = {
        id: Date.now(),
        description: newTask
      };
      setTasks([...tasks, newTaskItem]);
      setNewTask("");
    }
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  }

  const moveTaskUp = (id: number) => {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex > 0) {
      const updatedTasks = [...tasks];
      const temp = updatedTasks[taskIndex];
      updatedTasks[taskIndex] = updatedTasks[taskIndex - 1];
      updatedTasks[taskIndex - 1] = temp;
      setTasks(updatedTasks);
    }
  }

  const moveTaskDown = (id: number) => {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex < tasks.length - 1) {
      const updatedTasks = [...tasks];
      const temp = updatedTasks[taskIndex];
      updatedTasks[taskIndex] = updatedTasks[taskIndex + 1];
      updatedTasks[taskIndex + 1] = temp;
      setTasks(updatedTasks);
    }
  }

  return (
    <div className="toDoList">
      <h1>To Do List</h1>
      <div>
        <TextField
          label="Scrivi un task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <Button variant="contained" onClick={addTask}>Aggiungi</Button>
      </div>
      <List>
        {tasks.map(task => (
          <ListItem className='lista' key={task.id}>
            <ListItemText primary={task.description} />
            <IconButton onClick={() => deleteTask(task.id)}>
              <DoneIcon color="success" />
            </IconButton>
            <IconButton onClick={() => moveTaskUp(task.id)}>
              <SwipeUpIcon color="primary" />
            </IconButton>
            <IconButton onClick={() => moveTaskDown(task.id)}>
              <SwipeDownIcon color="primary" />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default ToDoList;
