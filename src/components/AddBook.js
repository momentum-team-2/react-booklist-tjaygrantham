import React, { useState } from 'react'
import axios from 'axios'

export default function AddBook (props) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [status, setStatus] = useState('toread')

  function handleTitleChange (e) {
    setTitle(e.target.value)
  }

  function handleAuthorChange (e) {
    setAuthor(e.target.value)
  }

  function handleStatusChange (e) {
    setStatus(e.target.value)
  }

  function handleAddBook (e) {
    e.preventDefault()
    axios.post('https://books-api.glitch.me/api/books', {
      title: title,
      authors: [author],
      status: status
    }, {
      auth: props.authorization
    })
  }

  return (
    <div className='AddBook'>
      <h3>Add Book</h3>
      <form onSubmit={handleAddBook}>
        <p><label>Title </label>
          <input value={title} onChange={handleTitleChange} />
        </p>
        <p><label>Author </label>
          <input value={author} onChange={handleAuthorChange} />
        </p>
        <p><label>Status </label>
          <select onChange={handleStatusChange}>
            <option value='toread'>To Read</option>
            <option value='reading'>Reading</option>
            <option value='read'>Read</option>
          </select>
        </p>
        <button type='submit'>Add</button>
      </form>
    </div>
  )
}
