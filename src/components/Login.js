import React from 'react'
import axios from 'axios'

class Login extends React.Component {
  constructor () {
    super()
    this.state = {
      username: null,
      password: null
    }
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin (e) {
    e.preventDefault()
    const authorization = {
      username: this.state.username,
      password: this.state.password
    }
    axios.get('https://books-api.glitch.me/api/users', {
      auth: authorization
    }).then(response => {
      if (response.status === 200 && response.data.ok) {
        this.props.setAuthorization(authorization)
      }
    })
  }

  handleRegistration (e) {
  }

  render () {
    return (
      <div className='login'>
        <label>Username: </label>
        <input type='text' name='username' value={this.state.username} onChange={e => this.setState({ username: e.target.value })} />
        <br />
        <label>Password: </label>
        <input type='text' name='password' value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
        <br />
        <button type='submit' onClick={this.handleLogin}>Login</button>
        <button type='submit' onClick={this.handleRegistration}>Register</button>
      </div>
    )
  }
}

export default Login
