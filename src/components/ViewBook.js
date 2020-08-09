import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'
import { PacmanLoader } from 'react-spinners'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faBook, faUserEdit, faPencilAlt, faEdit, faSave } from '@fortawesome/free-solid-svg-icons'

export default function ViewBook (props) {
  const history = useHistory()
  const { bookId } = useParams()
  const [book, setBook] = useState({})
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState([])
  const [newNoteText, setNewNoteText] = useState('')
  const [newNotePage, setNewNotePage] = useState(1)
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    axios.get(`https://books-api.glitch.me/api/books/${bookId}`, {
      auth: JSON.parse(props.authorization)
    }).then(response => {
      setBook(response.data.book)
      setTitle(response.data.book.title)
      setAuthors(response.data.book.authors)
      setNotes(response.data.book.notes)
      setLoading(false)
    })
  })

  function saveBook () {
    setLoading(true)
    axios.put(`https://books-api.glitch.me/api/books/${bookId}`, {
      title: title,
      authors: authors,
      status: book.status
    }, {
      auth: JSON.parse(props.authorization)
    }).then(response => {
      if (response.status === 200) {
        setBook(response.data)
      } else if (response.status === 401) {
        history.push('/logout')
        history.go()
      }
    }).catch(error => {
      setError(error.message)
    }).finally(() => {
      setEditing(false)
      setLoading(false)
    })
  }

  let view = (
    <div className='mt6'>
      <PacmanLoader />
    </div>
  )
  if (!loading) {
    view = (
      <>
        {
          editing
            ? (
              <>
                <input
                  className='mt2 pa2 input-reset ba bg-transparent w-25'
                  type='text'
                  value={title}
                  onChange={e => {
                    setTitle(e.target.value)
                  }}
                />
                <input
                  className='mt2 pa2 input-reset ba bg-transparent w-25'
                  type='text'
                  value={authors.join(', ')}
                  onChange={e => {
                    setAuthors(e.target.value.split(', '))
                  }}
                />
                <label
                  type='button'
                  className='b ml2 mt2 ph3 pv3 input-reset ba b--black grow pointer f7 dib w4 tc noselect no-underline bg-transparent black'
                  onClick={(e) => {
                    saveBook()
                  }}
                >
                  <FontAwesomeIcon className='pr2' icon={faSave} />
                  Save Changes
                </label>
              </>
            )
            : (
              <>
                <h1 className='ml2 mt3 mb0'><FontAwesomeIcon className='pr3' icon={faBook} />{title}</h1>
                <h3 className='ml2 mt1'><FontAwesomeIcon className='pr2' icon={faUserEdit} />By {authors.join(', ')}</h3>
              </>
            )
        }
        <h4>Notes</h4>
        <p className='red tc'>{error}</p>
        <label
          type='button'
          className={`b ml2 ph3 pv3 input-reset ba b--black grow pointer f7 dib w4 tc noselect no-underline ${adding ? 'bg-black' : 'bg-transparent'} ${adding ? 'white' : 'black'}`}
          onClick={(e) => {
            setNewNotePage(1)
            setNewNoteText('')
            setAdding(!adding)
          }}
        >
          <FontAwesomeIcon className='pr2' icon={faPencilAlt} />
          {adding ? 'Cancel Add' : 'Add Note'}
        </label>
        {adding && (
          <>
            <form
              className='flex flex-column items-center justify-center'
              onSubmit={e => {
                e.preventDefault()
                axios.post(`https://books-api.glitch.me/api/books/${bookId}/notes`, {
                  note: newNoteText,
                  page: newNotePage
                }, {
                  auth: JSON.parse(props.authorization)
                }).then(response => {
                  if (response.status === 200) {
                    setNotes(response.data.notes)
                  } else if (response.status === 401) {
                    history.push('/logout')
                    history.go()
                  }
                }).catch(error => {
                  setError(error.message)
                }).finally(() => {
                  setAdding(false)
                })
              }}
            >
              <label
                className='mt3'
                value='page'
              >
                Page
              </label>
              <input
                type='number'
                className='mt2'
                value={newNotePage}
                onChange={e => {
                  setNewNotePage(e.target.value)
                }}
              />
              <label
                className='mt2'
                value='note'
              >
                Note
              </label>
              <textarea
                className='mt2 pa2 input-reset ba bg-transparent w-100'
                cols={50}
                rows={10}
                value={newNoteText}
                onChange={e => {
                  setNewNoteText(e.target.value)
                }}
              />
              <button
                type='submit'
                className='b ml2 mt2 ph3 pv3 input-reset ba b--black grow pointer f7 dib w4 tc noselect no-underline bg-transparent black'
              >
                Add Note
              </button>
            </form>
          </>
        )}
        {notes.sort((a, b) => {
          return a.page < b.page ? -1 : 1
        }) && notes.map((note, idx) => {
          return (
            <div key={idx} className='ba bw1 br2 mt2 w-30 bg-transparent'>
              <h4 className='ml2 mt1 mb0'>Pg. {note.page}</h4>
              <p className='ml2 mt1'>{note.note}</p>
            </div>
          )
        })}
      </>
    )
  }
  return (
    <div className='BookView flex flex-column items-center justify-center mt3'>
      <div className='flex flex-row'>
        <label
          type='button'
          className='b ml2 ph3 pv3 input-reset ba b--black grow pointer f7 dib w4 tc noselect no-underline bg-transparent black'
          onClick={(e) => {
            history.push('/home')
            history.go()
          }}
        >
          <FontAwesomeIcon className='pr2' icon={faChevronLeft} />
          Back to Books
        </label>
        <label
          type='button'
          className={`b ml2 ph3 pv3 input-reset ba b--black grow pointer f7 dib w4 tc noselect no-underline ${editing ? 'bg-black' : 'bg-transparent'} ${editing ? 'white' : 'black'}`}
          onClick={(e) => {
            setTitle(book.title)
            setAuthors(book.authors)
            setEditing(!editing)
          }}
        >
          <FontAwesomeIcon className='pr2' icon={faEdit} />
          {editing ? 'Cancel Edit' : 'Edit Book'}
        </label>
      </div>
      {view}
    </div>
  )
}
