import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../../../hooks/http.hook'
import {AuthContext} from '../../../context/AuthContext'
import {Loader} from '../../Loader'
import {TeacherCard} from './TeacherCard'

export const TeacherDetail = () => {
  const {token} = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [teacher, setTeacher] = useState('')
  const teacherId = useParams().id

  const getTeacher = useCallback(async () => {
    try {
      const fetched = await request(`/api/teacher/${teacherId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setTeacher(fetched)
    } catch (error) {}
  }, [token, teacherId, request])

  useEffect(() => {
    getTeacher()
  }, [getTeacher])
  

  if(loading){
    return(
      <Loader />
    )
  }
 
  return(
    <>
      { !loading  && <TeacherCard teacher={teacher} /> }
    </>
  )

}
