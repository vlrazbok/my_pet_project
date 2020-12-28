
import React, {useState, useEffect, useContext} from 'react'
import {useHttp} from '../../hooks/http.hook'
import {useMessage} from '../../hooks/message.hook'
import {AuthContext} from '../../context/AuthContext'



export const DisciplineCard = ({ discipline }) => {
  const {loading, request, error, clearError} = useHttp()
  const message = useMessage()
  
  const [form, setForm] = useState({name: ''})
  const [student, setStudent] = useState({group: ''})
  const auth = useContext(AuthContext)

  useEffect(() => {

    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])
  
  const changeHandlerTeacher = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }
  const changeHandlerStudent = event => {
    setStudent({ ...student, [event.target.name]: event.target.value })
  }
  const addHandlerTeacher = async () => {
    try { 
      const dataDiscipline = await request('/api/discipline/update-teacher', 'POST', {...form, discipline}, 
      {
        Authorization: `Bearer ${auth.token}`
      })
      const dataTeacher = await request('/api/teacher/update-discipline', 'POST', {...form, discipline}, 
      {
        Authorization: `Bearer ${auth.token}`
      })
      
      message(dataDiscipline.message)
      message(dataTeacher.message)
    } catch (e) {}
  }
  
  const addHandlerStudent = async () => {
    try {
      const dataDiscipline = await request('/api/discipline/update-group', 'POST', {...student, discipline}, 
      {
        Authorization: `Bearer ${auth.token}`
      })
      const dataGroup = await request('/api/student/update-discipline', 'POST', {...student, discipline}, 
      {
        Authorization: `Bearer ${auth.token}`
      })

      
      message(dataDiscipline.message)
      message(dataGroup.message)
    } catch (e) {
      
    }
  }

  return (
    <>
      <h4>Дисципліна - {discipline.name}</h4>
      <div className="row">
        <div className="col s4">
          <p>Викладачі: {discipline.teachers} </p>
          <div className="input-field">
            <input
              placeholder="Введіть викладача"
              id="name"
              type="text"
              name="name"
              className="yellow-input"
              value={form.name}
              onChange={changeHandlerTeacher}
            />
            <label htmlFor="name"></label>
            <button
              className="btn grey lighten-1 black-text"
              onClick={addHandlerTeacher}
              disabled={loading}
            >
              Додати викладача
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col s4">
            <p>Групи студентів: {discipline.studentGroups}</p>
            <div className="input-field">
          <input
            placeholder="Введіть групу студентів"
            id="group"
            type="text"
            name="group"
            className="yellow-input"
            value={student.group}
            onChange={changeHandlerStudent}
          />
          <label htmlFor="group"></label>
          <button
            className="btn grey lighten-1 black-text"
            onClick={addHandlerStudent}
            disabled={loading}
          >
            Додати групу
          </button>
        </div>
        </div>        
      </div>
    </>
  )
}
