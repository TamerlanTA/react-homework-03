import React, { useState } from 'react';
import { initialBooks } from './data';
import BookCard from './components/BookCard';
import BookForm from './components/BookForm';
import Toolbar from './components/Toolbar';

export default function App() {
  const [books, setBooks] = useState(initialBooks);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  console.log('[render] App', { count: books.length, filter, query });

  function isVisible(book) {
    const matchesStatus = filter === 'all' || book.status === filter;
    const matchesQuery = `${book.title} ${book.author}`.toLocaleLowerCase('ru').includes(query.trim().toLocaleLowerCase('ru'));
    return matchesStatus && matchesQuery;
  }
  function addBook(values) {
    setBooks(previous => [...previous, { ...values, id: crypto.randomUUID(), edition: 0, color: 'sage' }]);
    setFilter('all');
    setQuery('');
    setShowForm(false);
  }
  function changeStatus(id, status) {
    setBooks(previous => previous.map(book => book.id === id ? { ...book, status } : book));
  }
  function resetBook(id) {
    // Only this item's key changes. React remounts it and initializes both local states.
    console.log('[reset key]', id);
    setBooks(previous => previous.map(book => book.id === id ? { ...book, edition: book.edition + 1 } : book));
  }
  return <main>
    <header className="brand">Лист</header>
    <section className="heading"><div><h1>Моя библиотека</h1><p>Книги, к которым хочется возвращаться.</p></div><button className="primary add-button" aria-expanded={showForm} onClick={() => setShowForm(previous => !previous)}>{showForm ? 'Закрыть форму' : '+ Добавить книгу'}</button></section>
    {showForm && <BookForm onAdd={addBook} onCancel={() => setShowForm(false)} />}
    <Toolbar books={books} filter={filter} onFilter={setFilter} query={query} onQuery={setQuery} onReverse={() => setBooks(previous => [...previous].reverse())} />
    <ul className="books" aria-label="Книги">
      {/* Keep filtered items mounted: stable keys alone cannot preserve state after unmount. */}
      {books.map((book, index) => <BookCard key={`${book.id}:${book.edition}`} book={book} number={index + 1} visible={isVisible(book)} onStatusChange={changeStatus} onReset={resetBook} onRemove={id => setBooks(previous => previous.filter(item => item.id !== id))} />)}
    </ul>
    {!books.some(isVisible) && <div className="empty" role="status"><h2>{books.length ? 'Ничего не найдено' : 'Ваша библиотека пока пуста'}</h2><p>{books.length ? 'Измените поиск или выберите другой статус.' : 'Добавьте первую книгу, которую хотите прочитать.'}</p></div>}
  </main>;
}
