import React, { useState } from 'react';
import { statuses } from '../data';

export default function BookCard({ book, number, visible, onStatusChange, onReset, onRemove }) {
  // These values belong to this component instance, not to the parent list.
  const [pagesRead, setPagesRead] = useState(0);
  const [note, setNote] = useState('');
  console.log('[render] BookCard', { id: book.id, edition: book.edition, pagesRead, note, visible });

  return (
    <li hidden={!visible} className="book" aria-label={book.title}>
      <span className={`number ${book.color}`} aria-hidden="true">{String(number).padStart(2, '0')}</span>
      <div className="book-title"><h2>{book.title}</h2><p>{book.author}</p></div>
      <select aria-label={`Статус: ${book.title}`} value={book.status} onChange={event => onStatusChange(book.id, event.target.value)}>
        {Object.entries(statuses).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
      </select>
      <div className="progress">
        <output aria-label={`Прогресс: ${book.title}`}>{pagesRead} / {book.pages} стр.</output>
        <button disabled={pagesRead === book.pages} onClick={() => setPagesRead(previous => Math.min(previous + 10, book.pages))}>+10 стр.</button>
      </div>
      <input className="note" aria-label={`Заметка: ${book.title}`} placeholder="Ваша заметка о книге…" value={note} maxLength={300} onChange={event => setNote(event.target.value)} />
      <button className="text-button reset" title="Сбросить страницы и заметку" onClick={() => onReset(book.id)}>Сбросить прогресс</button>
      <button className="text-button danger" aria-label={`Удалить: ${book.title}`} onClick={() => onRemove(book.id)}>Удалить</button>
    </li>
  );
}
