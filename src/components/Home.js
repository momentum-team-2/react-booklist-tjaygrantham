import React from 'react'
import Books from './Books'
import { Redirect } from 'react-router-dom'

export default class Home extends React.Component {
  render () {
    if (!this.props.authorization) {
      return (
        <Redirect to={{ pathname: '/login' }} />
      )
    }
    return (
      <div className='Home'>
        <Books authorization={this.props.authorization} />
      </div>
    )
  }
}
