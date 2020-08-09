import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Logout from './components/Logout'
import Home from './components/Home'
import AddBook from './components/AddBook'
import ViewBook from './components/ViewBook'
import 'tachyons'
import './App.css'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      authorization: window.sessionStorage.getItem('authorization')
    }
    this.setAuthorization = this.setAuthorization.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  setAuthorization (credentials) {
    this.setState({
      authorization: JSON.stringify(credentials)
    })
    if (credentials) {
      window.sessionStorage.setItem('authorization', JSON.stringify(credentials))
    } else {
      window.sessionStorage.removeItem('authorization')
    }
  }

  handleLogout () {
    this.setAuthorization(null)
  }

  render () {
    return (
      <Router>
        <div className='App'>
          {!this.state.authorization && <Redirect to={{ pathname: '/login' }} />}
          <nav className='flex justify-between bb bg-black b--white-10'>
            <Link
              to='/home'
              style={{
                outline: 0
              }}
              className='link white-70 hover-white no-underline flex items-center pa3'
            >
              React Booklist
            </Link>
            <div className='flex-grow pa3 flex items-center'>
              {
                this.state.authorization
                  ? (
                    <Link
                      to='/logout'
                      style={{
                        outline: 0
                      }}
                      className='f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20'
                    >
                    Log out
                    </Link>
                  )
                  : (
                    <>
                      <Link
                        to='/login'
                        style={{
                          outline: 0
                        }}
                        className='f6 link dib white dim mr3 mr4-ns'
                      >
                        Log In
                      </Link>
                      <Link to='/signup' className='f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20'>Sign Up</Link>
                    </>
                  )
              }
            </div>
          </nav>
          <Switch>
            <Route path='/home'>
              <Home setAuthorization={this.setAuthorization} authorization={this.state.authorization} />
            </Route>
            <Route path='/book/:bookId'>
              <ViewBook authorization={this.state.authorization} />
            </Route>
            <Route path='/book/add'>
              <AddBook authorization={this.state.authorization} />
            </Route>
            <Route path='/login'>
              <Login authorization={this.state.authorization} setAuthorization={this.setAuthorization} />
            </Route>
            <Route path='/signup'>
              <SignUp />
            </Route>
            <Route path='/logout'>
              <Logout authorization={this.authorization} setAuthorization={this.setAuthorization} />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
