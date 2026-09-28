import React from 'react';
import { statuses } from '../data';

export default function Toolbar({ books, filter, onFilter, query, onQuery, onReverse }) {
  const filters = { all: 'Все книги', ...statuses };
  return <div className="toolbar">
    <div className="filters" role="group" aria-label="Фильтр по статусу">
      {Object.entries(filters).map(([value, label]) => <button key={value} aria-pressed={filter === value} className={filter === value ? 'selected' : ''} onClick={() => onFilter(value)}>{label}<span>{books.filter(book => value === 'all' || book.status === value).length}</span></button>)}
    </div>
    <input type="search" aria-label="Поиск книг" placeholder="Поиск по названию или автору…" value={query} onChange={event => onQuery(event.target.value)} />
    <button onClick={onReverse} disabled={books.length < 2}>Обратный порядок</button>
  </div>;
}
