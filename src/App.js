import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import AddBook from './components/AddBook'
import './App.css'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      authorization: JSON.parse(window.sessionStorage.getItem('authorization'))
    }
    this.setAuthorization = this.setAuthorization.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  setAuthorization (credentials) {
    this.setState({
      authorization: credentials
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
          {this.state.authorization && <p><Link to='/home'>Home</Link> Welcome <button onClick={this.handleLogout}>Log out</button></p>}
          {this.state.authorization
            ? <Redirect
              to={{
                pathname: '/home'
              }}
            />
            : <Redirect
              to={{
                pathname: '/login'
              }}
            />}
          <Switch>
            <Route path='/home'>
              <Home setAuthorization={this.setAuthorization} authorization={this.state.authorization} />
            </Route>
            <Route path='/book/add'>
              <AddBook authorization={this.state.authorization} />
            </Route>
            <Route path='/login'>
              <Login setAuthorization={this.setAuthorization} />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
