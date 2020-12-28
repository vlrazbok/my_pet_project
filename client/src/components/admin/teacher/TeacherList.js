import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../../../hooks/http.hook'
import {AuthContext} from '../../../context/AuthContext'
import {Loader} from '../../Loader'
import {Link} from 'react-router-dom'

export const TeacherList = () => {
  const [teachers, setTeachers] = useState([])
  const {loadig, request} = useHttp()
  const {token} = useContext(AuthContext)

  const fetchTeachers = useCallback(async () => {
    try {
      const fetched = await request('/api/teacher', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setTeachers(fetched)
    } catch (error) {}
  }, [token, request])

  useEffect(() => {
    fetchTeachers()
  }, [fetchTeachers])

  if(loadig){
    return <Loader />
  }
  return(
    <>
    <table>
      <thead>
      <tr>
        <th>№</th>
        <th>Ім'я та прізвище викладача</th>
        <th>Дисципліни викладача</th>
        <th>Email викладача</th>
        <th>Сторінка викладача</th>
      </tr>
      </thead>

      <tbody>
      { teachers.map((teacher, index) => {
        return (
          <tr key={teacher._id}>
            <td>{index + 1}</td>
            <td>{teacher.name}</td>
            <td>{teacher.disciplines}</td>
            <td>{teacher.email}</td>
            <td>
              <Link to={`/teacher/${teacher._id}`}>Перейти</Link>
            </td>
          </tr>
        )
      }) }
      </tbody>
    </table>
    </>
  )
}