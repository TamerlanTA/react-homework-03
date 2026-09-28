import React, { useState } from 'react';
import { statuses } from '../data';

export default function BookForm({ onAdd, onCancel }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState('200');
  const [status, setStatus] = useState('planned');
  const valid = title.trim() && author.trim() && Number.isInteger(Number(pages)) && Number(pages) > 0 && Number(pages) <= 10000;
  function submit(event) {
    event.preventDefault();
    if (valid) onAdd({ title: title.trim(), author: author.trim(), pages: Number(pages), status });
  }
  return <form className="add-form" onSubmit={submit}>
    <h2>Новая книга</h2>
    <div className="fields">
      <label>Название<input autoFocus required maxLength={100} value={title} onChange={event => setTitle(event.target.value)} /></label>
      <label>Автор<input required maxLength={100} value={author} onChange={event => setAuthor(event.target.value)} /></label>
      <label>Страниц<input required type="number" min="1" max="10000" step="1" value={pages} onChange={event => setPages(event.target.value)} /></label>
      <label>Статус<select value={status} onChange={event => setStatus(event.target.value)}>{Object.entries(statuses).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
    </div>
    <div className="form-actions"><button type="submit" className="primary" disabled={!valid}>Сохранить книгу</button><button type="button" onClick={onCancel}>Отмена</button></div>
  </form>;
}
