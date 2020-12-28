import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../../hooks/http.hook'
import {AuthContext} from '../../context/AuthContext'
import {Loader} from '../Loader'
import {useParams} from 'react-router-dom'
import { TestCreator } from './TestCreator'
import { ResultList } from './ResultList'

import './teacher.css'
import { TestList } from './TestList'

export const DisciplineInfo = () => {
  const {token} = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [discipline, setDiscipline] = useState('')
  const disciplineId = useParams().id

  const getDiscipline = useCallback(async () => {
    try {
      const fetched = await request(`/api/tinfo/${disciplineId}`, 'GET', null, {Authorization: `Bearer ${token}`})
      setDiscipline(fetched)
    } catch (e) {}
  }, [token, disciplineId, request])

  useEffect(() => {
    getDiscipline()
  }, [getDiscipline])



  if (loading) {
    return <Loader /> 
  } 

  return (
    <>
      <div className="row">
        <div className="col s6">
          <h4>Дисципліна - {discipline.name}</h4>
          <p>Групи: {discipline.studentGroups}</p>
          <TestList />  
          <TestCreator />
        </div>
        <div className="col s6">

          <p><b>Результати тестів</b></p>
          <ResultList />
        </div>
      </div>
      
      
      
    </>
  )
}