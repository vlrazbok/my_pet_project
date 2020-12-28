import React, {useContext, useState, useCallback, useEffect} from 'react'
import {AuthContext} from '../../context/AuthContext'
import {useHttp} from '../../hooks/http.hook'
import {Link} from 'react-router-dom'

import {Loader} from '../Loader'

export const TeacherInfo = () => {


  
  const [disciplines, setDisciplines] = useState([])
  const {loading, request} = useHttp()
  const {token, userId} = useContext(AuthContext)

  const fetchDisciplines = useCallback(async () => {
    try {
      const fetched = await request(`/api/tinfo/disciplines/${userId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setDisciplines(fetched)
    } catch (e) {}
  }, [token,userId, request])

  useEffect(() => {
    fetchDisciplines()
  }, [fetchDisciplines])

  if (loading) {
    return <Loader/>
  }
  
  return(
    
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Назва</th>
          <th>Сторінка дисципліни</th>
        </tr>
      </thead>
      <tbody>
      {
        disciplines.map((discipline, index) => {
          return (
            <tr key={discipline._id}>
              <td>{index + 1}</td>
              <td>{discipline.name}</td>
              <td>
                <Link to={`/tinfo/${discipline._id}`}>Перейти</Link>
              </td>
            </tr>
          )
        }) 
      }
      </tbody>
    </table>
  )
}