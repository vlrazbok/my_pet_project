import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../../../hooks/http.hook'
import {AuthContext} from '../../../context/AuthContext'
import {Loader} from '../../Loader'
import {StudentCard} from './StudentCard'

export const StudentDetail = () => {
  const {token} = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [student, setStudent] = useState('')
  const studentId = useParams().id

  const getStudent = useCallback(async () => {
    try {
      const fetched = await request(`/api/student/${studentId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setStudent(fetched)
    } catch (error) {}
  }, [token, studentId, request])

  useEffect(() => {
    getStudent()
  }, [getStudent])
  

  if(loading){
    return(
      <Loader />
    )
  }

  return(
    <>
      { !loading  && <StudentCard student={student} /> }
    </>
  )

}
