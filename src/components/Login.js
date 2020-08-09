import React from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import { PacmanLoader } from 'react-spinners'
import _ from 'lodash'

export default class Login extends React.Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      loading: false,
      error: ''
    }
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin (e) {
    e.preventDefault()
    const authorization = {
      username: this.state.username,
      password: this.state.password
    }
    this.setState({
      loading: true
    })
    axios.get('https://books-api.glitch.me/api/users', {
      crossdomain: true,
      auth: authorization
    }).then(response => {
      if (response.status === 200 && response.data.ok) {
        this.props.setAuthorization(authorization)
      }
    }).catch(error => {
      this.setState({
        error: error.response ? error.response.status === 401 ? 'username or password is incorrect' : error.response.data.errors[0] : 'user not found'
      })
    }).finally(() => {
      this.setState({
        loading: false
      })
    })
  }

  render () {
    if (this.props.authorization) {
      return (
        <Redirect to={{
          pathname: '/home'
        }}
        />
      )
    }
    let form = (
      <div className='mt6'>
        <PacmanLoader />
      </div>
    )
    if (!this.state.loading) {
      form = (
        <form className='w-30' onSubmit={this.handleLogin}>
          {this.state.error && <p className='red'>{_.upperFirst(this.state.error)}</p>}
          <h3 className='f4 fw6 ph0 mh0 mb3'>Sign In</h3>
          <div className='mb1 username-input'>
            <label className='fw5' for='username'>Username</label>
            <br />
            <input className='mt2 pa2 input-reset ba bg-transparent w-100' type='text' name='username' value={this.state.username} onChange={e => this.setState({ username: e.target.value })} />
          </div>
          <br />
          <div className='mb1 password-input'>
            <label className='fw5' for='password'>Password</label>
            <br />
            <input className='mt2 pa2 input-reset ba bg-transparent w-100' type='password' name='password' value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
          </div>
          <br />
          <input className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib' type='submit' value='Log In' />
          <Link to='/signup' style={{ outline: 0 }} className='mt2 f6 link dim black db'>Sign Up</Link>
        </form>
      )
    }
    return (
      <div className='flex items-center justify-center pt6 Login'>
        {form}
      </div>
    )
  }
}
