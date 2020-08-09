import React from 'react'
import { useHistory } from 'react-router-dom'

export default function Logout (props) {
  const history = useHistory()
  return (
    <div className='logout'>
      {props.setAuthorization(null)}
      {new Promise(resolve => setTimeout(resolve, 100)).then(() => {
        history.push('/login')
        history.go()
      })}
    </div>
  )
}
