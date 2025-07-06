import React, { useState } from 'react';
import TaskForm from './TaskForm';

export default function TaskItem({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  function toggleComplete() {
    onUpdate(task._id, { completed: !task.completed });
  }

  function handleSave(updated) {
    onUpdate(task._id, updated);
    setIsEditing(false);
  }

  if (isEditing) {
    return <TaskForm initialData={task} onSave={handleSave} />;
  }

  return (
    <li style={{ marginBottom:10 }}>
      <input type="checkbox" checked={task.completed} onChange={toggleComplete} />
      <strong style={{ textDecoration: task.completed ? 'line-through' : 'none', marginLeft:8 }}>{task.title}</strong>
      {task.dueDate && <span> (due {new Date(task.dueDate).toLocaleDateString()})</span>}
      <button onClick={() => setIsEditing(true)} style={{ marginLeft:8 }}>Edit</button>
      <button onClick={() => onDelete(task._id)} style={{ marginLeft:4 }}>Delete</button>
    </li>
  );
}