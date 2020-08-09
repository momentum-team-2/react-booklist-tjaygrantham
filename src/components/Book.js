import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Draggable } from 'react-beautiful-dnd'
import { ShakeLittle } from 'reshake'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faUserEdit } from '@fortawesome/free-solid-svg-icons'

export default function Book (props) {
  const { book, idx, deleting } = props
  const history = useHistory()
  const draggable = (
    <Draggable
      draggableId={book._id}
      isDragDisabled={deleting}
      index={idx}
    >
      {(provided, snapshot) => (
        <div
          className='ba bw1 br2 mb2 bg-transparent grow shadow-hover'
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            userSelect: 'none',
            cursor: deleting ? 'pointer' : 'grab',
            padding: 8,
            height: '8rem',
            background: snapshot.isDragging ? 'lightgray' : 'white',
            color: deleting ? 'red' : 'black',
            ...provided.draggableProps.style
          }}
        >
          <div className='Book tl'>
            <h4 className='ml2 mt1 mb0'><FontAwesomeIcon className='pr2' icon={faBook} />{props.book.title}</h4>
            <p className='ml2 mt1'><FontAwesomeIcon className='pr1' icon={faUserEdit} />By {props.book.authors.join(', ')}</p>
          </div>
        </div>
      )}
    </Draggable>
  )
  if (deleting) {
    return (
      <ShakeLittle
        fixed='true'
        onClick={(e) => {
          let target = e.target
          while (!target.getAttribute('data-rbd-draggable-id')) {
            target = target.parentElement
          }
          const draggableId = target.getAttribute('data-rbd-draggable-id')
          const droppableId = target.parentElement.parentElement.getAttribute('data-rbd-droppable-id')
          axios.delete(`https://books-api.glitch.me/api/books/${draggableId}`, {
            auth: JSON.parse(props.authorization)
          }).then(response => {
            props.setDroppableData(droppableId,
              props.getDroppableData(droppableId).filter((book, idx) => book._id !== draggableId)
            )
          }).catch(error => {
            if (error.response && error.response.status === 401) {
              history.push('/logout')
              history.go()
            }
          })
        }}
      >
        {draggable}
      </ShakeLittle>
    )
  } else {
    return draggable
  }
}
