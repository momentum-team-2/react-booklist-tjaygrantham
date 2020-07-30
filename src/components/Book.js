import React from 'react'

export default class Book extends React.Component {
  render () {
    return (
      <div className='Book'>
        <h4>{this.props.book.title}</h4>
        <p>{this.props.book.authors.map((author, idx) => {
          return `${idx > 0 ? ', ' : ''}${author} `
        })}
        </p>
      </div>
    )
  }
}
