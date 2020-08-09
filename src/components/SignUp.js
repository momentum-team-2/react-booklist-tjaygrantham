import React from 'react'
import axios from 'axios'
import { Redirect, Link, withRouter } from 'react-router-dom'
import { PacmanLoader } from 'react-spinners'
import _ from 'lodash'

class SignUp extends React.Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      passwordConfirmation: '',
      error: '',
      loading: false
    }
    this.handleSignUp = this.handleSignUp.bind(this)
  }

  handleSignUp (e) {
    e.preventDefault()
    const { history } = this.props
    const { username, password, passwordConfirmation } = this.state
    this.setState({
      loading: true
    })
    if (username && password && password === passwordConfirmation) {
      axios.post('https://books-api.glitch.me/api/users', {
        username: username,
        password: password
      }).then(response => {
        history.push('/login')
        history.go()
      }).catch(error => {
        this.setState({
          error: error.response.data.errors[0]
        })
      }).finally(() => {
        this.setState({
          loading: false
        })
      })
    }
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
        <>
          <form className='w-30' onSubmit={this.handleSignUp}>
            {!this.state.error || <p className='red'>{_.upperFirst(this.state.error)}</p>}
            <h3 className='f4 fw6 ph0 mh0 mb3'>Sign Up</h3>
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
            <div className='mb1 passwordConfirmation-input'>
              <label className='fw5' for='password'>Confirm Password {this.state.password && this.state.passwordConfirmation && this.state.password !== this.state.passwordConfirmation && <span className='red tc pl2'>Passwords don't match</span>}</label>
              <br />
              <input className='mt2 pa2 input-reset ba bg-transparent w-100' type='password' name='password' value={this.state.passwordConfirmation} onChange={e => this.setState({ passwordConfirmation: e.target.value })} />
            </div>
            <br />
            <input className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib' type='submit' value='Sign Up' />
            <Link to='/login' style={{ outline: 0 }} className='mt2 f6 link dim black db'>Already have an account? Log in</Link>
          </form>
        </>
      )
    }
    return (
      <div className='flex items-center justify-center pt6 SignUp'>
        {form}
      </div>
    )
  }
}

export default withRouter(SignUp)
