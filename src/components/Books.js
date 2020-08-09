import React from 'react'
import axios from 'axios'
import BookList from './BookList'
import AddBook from './AddBook'
import { withRouter } from 'react-router-dom'
import { DragDropContext } from 'react-beautiful-dnd'
import { PacmanLoader } from 'react-spinners'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'

class Books extends React.Component {
  constructor () {
    super()
    this.state = {
      toread: [],
      reading: [],
      read: [],
      adding: false,
      deleting: false,
      loading: true
    }
    this.handleDragEnd = this.handleDragEnd.bind(this)
    this.reloadBooks = this.reloadBooks.bind(this)
    this.move = this.move.bind(this)
    this.getDroppableData = this.getDroppableData.bind(this)
    this.setDroppableData = this.setDroppableData.bind(this)
  }

  move (source, destination, droppableSource, droppableDestination) {
    const sourceClone = Array.from(source)
    const destClone = Array.from(destination)
    const [removed] = sourceClone.splice(droppableSource.index, 1)

    destClone.splice(droppableDestination.index, 0, removed)

    const result = {}
    const sourceId = droppableSource.droppableId
    const destinationId = droppableDestination.droppableId
    result[sourceId] = sourceClone
    result[destinationId] = destClone

    this.setState({
      [sourceId]: result[sourceId],
      [destinationId]: result[destinationId]
    })
  }

  getDroppableData (droppableId) {
    return this.state[droppableId]
  }

  setDroppableData (droppableId, newArray) {
    this.setState({
      [droppableId]: newArray
    })
  }

  reloadBooks () {
    const { history } = this.props
    this.setState({
      adding: false,
      loading: true
    })
    axios.get('https://books-api.glitch.me/api/books', {
      auth: JSON.parse(this.props.authorization)
    }).then(response => {
      const grouped = _.groupBy(response.data.books, 'status')
      this.setState({
        toread: grouped.toread || [],
        reading: grouped.reading || [],
        read: grouped.read || []
      })
    }).catch(error => {
      if (error.response && error.response.status === 401) {
        history.push('/logout')
        history.go()
      }
    }).finally(() => {
      this.setState({
        loading: false
      })
    })
  }

  componentDidMount () {
    this.reloadBooks()
  }

  handleDragEnd (result) {
    const { source, destination, draggableId } = result
    if (!source || !destination) {
      return
    }
    const sourceId = source.droppableId
    const destinationId = destination.droppableId
    if (sourceId === destinationId) {
      return
    }
    for (const book of this.state[sourceId]) {
      if (!book) {
        continue
      }
      if (book._id === draggableId) {
        const target = book
        axios.put(`https://books-api.glitch.me/api/books/${draggableId}`, {
          title: target.title,
          authors: target.authors,
          status: destinationId
        },
        {
          auth: JSON.parse(this.props.authorization)
        }).then(response => {
          if (response.status !== 200) {
            this.move(this.state[destinationId], this.state[sourceId], destination, source)
          }
        })
        this.move(this.state[sourceId], this.state[destinationId], source, destination)
      }
    }
  }

  render () {
    const { adding, deleting, loading } = this.state
    let dndContext = (
      <div className='mt6'>
        <PacmanLoader />
      </div>
    )
    if (!loading) {
      dndContext = (
        <>
          <DragDropContext
            onDragEnd={this.handleDragEnd}
          >
            <div className='flex flex-row justify-center tc'>
              {['toread', 'reading', 'read'].map((status, idx) => {
                return <BookList key={idx} droppableId={status} data={this.state[status]} authorization={this.props.authorization} deleting={deleting} getDroppableData={this.getDroppableData} setDroppableData={this.setDroppableData} />
              })}
            </div>
          </DragDropContext>
        </>
      )
    }
    return (
      <div className='Books'>
        <div className='flex flex-column items-center justify-center'>
          <h2>Books</h2>
          <div>
            <label
              type='button'
              className={`b ml2 ph3 pv3 input-reset noselect ba b--black grow pointer f7 dib w4 tc noselect ${adding ? 'bg-black' : 'bg-transparent'} ${adding ? 'white' : 'black'}`}
              onClick={(e) => {
                this.setState({
                  adding: !adding,
                  deleting: false
                })
              }}
            >
              <FontAwesomeIcon className='pr2' icon={adding ? faChevronLeft : faPlus} />
              {adding ? 'Back to Books' : 'Add Book'}
            </label>
            <label
              type='button'
              className={`b ml2 ph3 pv3 input-reset ba b--black grow pointer f7 dib w4 tc noselect ${deleting ? 'bg-black' : 'bg-transparent'} ${deleting ? 'white' : 'black'}`}
              onClick={(e) => {
                this.setState({
                  deleting: adding ? false : !deleting
                })
              }}
            >
              <FontAwesomeIcon className='pr2' icon={faTrashAlt} />
              {deleting ? 'Stop Deleting' : 'Delete Books'}
            </label>
          </div>
          {adding ? <AddBook reloadBooks={this.reloadBooks} authorization={this.props.authorization} /> : dndContext}
        </div>
      </div>
    )
  }
}

export default withRouter(Books)
