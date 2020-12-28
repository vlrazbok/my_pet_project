import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'

 const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  return (
    <nav>
      <div className="nav-wrapper deep-purple accent-4" style={{ padding: '0 2rem' }}>
        <span className="brand-logo">Адміністративна панель</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/discipline">Дисципліни</NavLink></li>
          <li><NavLink to="/teacher">Викладачі</NavLink></li>
          <li><NavLink to="/student">Студенти</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Вийти</a></li>
        </ul>
      </div>
    </nav>
    
  )
}

export default Navbar