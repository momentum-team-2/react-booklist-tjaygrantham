import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Book from './Book'

export default class Books extends React.Component {
  constructor () {
    super()
    this.state = {
      books: []
    }
  }

  componentDidMount () {
    axios.get('https://books-api.glitch.me/api/books', {
      auth: this.props.authorization
    }).then(response => {
      if (response.status === 200) {
        this.setState({
          books: response.data.books
        })
      }
    })
  }

  render () {
    return (
      <div className='Books'>
        <h2>Books</h2>
        <Link to='/book/add'>Add Book</Link>
        {this.state.books.map((book, idx) => {
          return <Book key={idx} book={book} />
        })}
      </div>
    )
  }
}
