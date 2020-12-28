import React, {useContext, useState, useCallback, useEffect} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'
import {useHttp} from '../../hooks/http.hook'
import {Loader} from '../Loader'


export const NavbarStudent = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  const {token} = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [student, setStudent] = useState()


  const getStudent = useCallback(async () => {
    try {
      const fetched = await request(`/api/student-page/student/${auth.userId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      
      setStudent(fetched)
    } catch (error) {}
  }, [token, auth.userId, request])

  useEffect(() => {
    getStudent()
  }, [getStudent])

  if(loading || student===undefined){
    return(
      <Loader />
    )
  }

  return (
    <>
      <nav>
        <div className="nav-wrapper yellow darken-3" style={{ padding: '0 2rem' }}>
          <span className="brand-logo">Студент {student.firstName} {student.lastName}</span>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><NavLink to="/student-page">Дисципліни</NavLink></li>
            <li><NavLink to="/results">Результати</NavLink></li>
            <li><a href="/" onClick={logoutHandler}>Вийти</a></li>
          </ul>
        </div>
      </nav>
    </>
  )
}

