import React from 'react'
import Book from './Book'
import { Droppable } from 'react-beautiful-dnd'
import _ from 'lodash'

export default function BookList (props) {
  const { droppableId, deleting, getDroppableData, setDroppableData, authorization } = props
  return (
    <div className='grid'>
      <h3>{droppableId === 'toread' ? 'To Read' : _.upperFirst(droppableId)}</h3>
      <Droppable
        droppableId={droppableId}
      >
        {(provided, snapshot) => (
          <div
            style={{
              background: snapshot.isDraggingOver ? 'lightgray' : 'white',
              padding: 8,
              width: 300,
              height: '80%'
            }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {props.data.map((book, idx) => {
              return <Book key={book._id} book={book} idx={idx} deleting={deleting} getDroppableData={getDroppableData} setDroppableData={setDroppableData} authorization={authorization} />
            })}
          </div>
        )}
      </Droppable>
    </div>
  )
}
