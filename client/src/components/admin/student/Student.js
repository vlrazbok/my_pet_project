import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../../../hooks/http.hook'
import {useMessage} from '../../../hooks/message.hook'
import {AuthContext} from '../../../context/AuthContext'
import {useHistory} from 'react-router-dom'
import {StudentList} from './StudentList'

export const Student = () => {
  const history = useHistory()
  const message = useMessage()
  const auth = useContext(AuthContext)
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '', password: '',role: 'student', firstName: '', lastName: '', group: '', disciplines: [], testResult: []
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
      const data = await request('/api/student/register', 'POST', {...form},
      {
        Authorization: `Bearer ${auth.token}`
      })
      history.push(`/student/${data.student._id}`)
    } catch (e) {}
  }

  return(
    <div className="row">
      <div className="col s5 offset-s3 ">
        <div className="teacherCard card white">
          <div className="card-content white-text">
            <div>
              <div className="input-field">
                <input
                  placeholder="Введіть email"
                  id="email"
                  type="text"
                  name="email"
                  className="yellow-input"
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
                  className="yellow-input"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Пароль</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Введіть ім'я студента"
                  id="firstName"
                  type="text"
                  name="firstName"
                  className="yellow-input"
                  value={form.firstName}
                  onChange={changeHandler}
                />
                <label htmlFor="firstName">Ім'я студента</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Введіть прізвище студента"
                  id="lastName"
                  type="text"
                  name="lastName"
                  className="yellow-input"
                  value={form.lastName}
                  onChange={changeHandler}
                />
                <label htmlFor="lastName">Прізвище студента</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Введіть групу студента"
                  id="group"
                  type="text"
                  name="group"
                  className="yellow-input"
                  value={form.group}
                  onChange={changeHandler}
                />
                <label htmlFor="group">Група студента</label>
              </div>


            </div>
          </div>
          <div className="card-action center">
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Додати студента
            </button>
          </div>
        </div>
      </div>

    
    <StudentList />
    </div>
  )
}

