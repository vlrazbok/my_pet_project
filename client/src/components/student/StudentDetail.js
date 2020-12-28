import React, {useContext, useState, useCallback, useEffect} from 'react'
import {AuthContext} from '../../context/AuthContext'
import {useHttp} from '../../hooks/http.hook'
import {Loader} from '../Loader'

import {Link} from 'react-router-dom'

export const StudentDetail = () => {
  
  const {token, userId} = useContext(AuthContext)
  const {request, loading} = useHttp()
  
  const [disciplines, setDisciplines] = useState([])
  
  const fetchDisciplines = useCallback(async () => {
    try {
      const fetched = await request(`/api/student-page/${userId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setDisciplines(fetched)
    } catch (e) {}
  }, [token, userId, request])

  useEffect(() => {
    fetchDisciplines()
  }, [fetchDisciplines])

  if(loading){
    return(
      <Loader />
    )
  }

  return(
    <>
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
                <Link to={`/discipline/${discipline._id}`}>Перейти</Link>
              </td>
            </tr>
          )
        }) 
      }
      </tbody>
    </table>
    </>
  )
}