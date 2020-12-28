import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../../../hooks/http.hook'
import {useMessage} from '../../../hooks/message.hook'
import {AuthContext} from '../../../context/AuthContext'
import {useHistory} from 'react-router-dom'
import {TeacherList} from './TeacherList'

import './Teacher.css'

export const Teacher = () => {
  const history = useHistory()
  const message = useMessage()
  const auth = useContext(AuthContext)
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '', password: '', role: 'teacher', name: '', disciplines: []
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  } 

  const registerHandler = async () => {
    try {
      const data = await request('/api/teacher/register', 'POST', {...form},
      {
        Authorization: `Bearer ${auth.token}`
      })
      history.push(`/teacher/${data.teacher._id}`)
    } catch (e) {}
  }
  
  return ( 
    <div className="row">
      <div className="col s5 offset-s3">
        <div className="teacherCard card white">
          <div className="card-content white-text">
            <div>

              <div className="input-field">
                <input
                  placeholder="Введіть email"
                  id="email"
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Введіть пароль"
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Пароль</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Введіть ім'я викладача"
                  id="name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={changeHandler}
                />
                <label htmlFor="name">Ім'я викладача</label>
              </div>

              
            </div>
          </div>
          <div className="card-action center">
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Додати викладача
            </button>
          </div>
        </div>
      </div>

    
    <TeacherList />
    </div>
  )
}

