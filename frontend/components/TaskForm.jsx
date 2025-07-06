import React, { useState, useEffect } from 'react';

export default function TaskForm({ onSave, initialData }) {
  const [title, setTitle]         = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [dueDate, setDueDate]     = useState(initialData?.dueDate?.substring(0,10) || '');
  const [priority, setPriority]   = useState(initialData?.priority || 'medium');
  const [completed, setCompleted] = useState(initialData?.completed || false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || '');
      setDueDate(initialData.dueDate?.substring(0,10) || '');
      setPriority(initialData.priority);
      setCompleted(initialData.completed);
    }
  }, [initialData]);

  function handleSubmit(e) {
    e.preventDefault();
    onSave({ title, description, dueDate, priority, completed });
    if (!initialData) {
      setTitle(''); setDescription(''); setDueDate(''); setPriority('medium'); setCompleted(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom:20 }}>
      <input required placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <input placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
      <input type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} />
      <select value={priority} onChange={e=>setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">{initialData ? 'Update' : 'Add'} Task</button>
    </form>
  );
}