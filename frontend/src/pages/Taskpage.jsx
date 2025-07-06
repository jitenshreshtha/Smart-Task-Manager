import React, { useEffect, useState } from 'react';
import TaskForm from '../../components/TaskForm';
import TaskList from '../../components/TaskList';

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);

  async function fetchTasks() {
    const res = await fetch('http://localhost:5000/tasks', { credentials: 'include' });
    const data = await res.json();
    setTasks(data);
  }

  useEffect(() => { fetchTasks(); }, []);

  async function handleCreate(task) {
    await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers:{ 'Content-Type':'application/json' },
      credentials:'include',
      body: JSON.stringify(task)
    });
    fetchTasks();
  }

  async function handleUpdate(id, updates) {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers:{ 'Content-Type':'application/json' },
      credentials:'include',
      body: JSON.stringify(updates)
    });
    fetchTasks();
  }

  async function handleDelete(id) {
    await fetch(`http://localhost:5000/tasks/${id}`, { method:'DELETE', credentials:'include' });
    fetchTasks();
  }

  return (
    <div style={{ padding:20 }}>
      <h2>Your Tasks</h2>
      <TaskForm onSave={handleCreate} />
      <TaskList tasks={tasks} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  );
}