import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'

export const NavbarTeacher = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const {teacherName} = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  return (
    <nav>
      <div className="nav-wrapper teal accent-4" style={{ padding: '0 2rem' }}>
        <span className="brand-logo">Викладач {teacherName}</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/tinfo">Дисципліни</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Вийти</a></li>
        </ul>
      </div>
    </nav>
    
  )
}

