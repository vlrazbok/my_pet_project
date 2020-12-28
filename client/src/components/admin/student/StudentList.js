import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../../../hooks/http.hook'
import {AuthContext} from '../../../context/AuthContext'
import {Loader} from '../../Loader'
import {Link} from 'react-router-dom'

export const StudentList = () => {
  const [students, setStudents] = useState([])
  const {loadig, request} = useHttp()
  const {token} = useContext(AuthContext)

  const fetchStudents = useCallback(async () => {
    try {
      const fetched = await request('/api/student', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setStudents(fetched)
    } catch (error) {}
  }, [token, request])

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents])

  if(loadig){
    return <Loader />
  }

  
  return(
    <>
   
    <table>
      <thead>
      <tr>
        <th>№</th>
        <th>Email студента</th>
        <th>Ім'я студента</th>
        <th>Прізвище студента</th>
      
        <th>Група студента</th>
        <th>Дисципліни студента</th>
        <th>Сторінка студента</th>
      </tr>
      </thead>

      <tbody>
      { students.map((student, index) => {
        return (
          <tr key={student._id}>
            <td>{index + 1}</td>
            <td>{student.email}</td>
            <td>{student.firstName}</td>
            <td>{student.lastName}</td>
            <td>{student.group}</td>
            <td>{student.disciplines}</td>
            <td>
              <Link to={`/student/${student._id}`}>Перейти</Link>
            </td>
          </tr>
        )
      }) }
      </tbody>
    </table>
    </>
  )
}