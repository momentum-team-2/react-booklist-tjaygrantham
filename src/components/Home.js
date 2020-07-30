import React from 'react'
import Books from './Books'

export default class Home extends React.Component {
  render () {
    return (
      <div className='Home'>
        <br />
        <Books authorization={this.props.authorization} />
      </div>
    )
  }
}
