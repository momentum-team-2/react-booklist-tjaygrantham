import React, { useState } from 'react'
import axios from 'axios'

export default function AddBook (props) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [status, setStatus] = useState('toread')

  function handleAddBook (e) {
    e.preventDefault()
    console.log(props.authorization)
    axios.post('https://books-api.glitch.me/api/books', {
      title: title,
      authors: [author],
      status: status
    }, {
      auth: JSON.parse(props.authorization)
    }).then(response => {
      props.reloadBooks()
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <div className='flex items-center justify-center AddBook'>
      <form style={{ width: 350 }} onSubmit={handleAddBook}>
        <h3 className='mt3 f4 fw6 ph0 mh0 mb3 tc'>Add Book</h3>
        <p><label className='fw5'>Title</label><br />
          <input className='mt2 pa2 input-reset ba bg-transparent w-100' value={title} onChange={e => setTitle(e.target.value)} />
        </p>
        <p><label className='fw5'>Author</label><br />
          <input className='mt2 pa2 input-reset ba bg-transparent w-100' value={author} onChange={e => setAuthor(e.target.value)} />
        </p>
        <p><label className='fw5'>Status</label><br />
          <select className='mt2 pa2 ba bg-transparent w-30' onChange={e => setStatus(e.target.value)}>
            <option value='toread'>To Read</option>
            <option value='reading'>Reading</option>
            <option value='read'>Read</option>
          </select>
        </p>
        <input className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6' type='submit' value='Add' />
      </form>
    </div>
  )
}
