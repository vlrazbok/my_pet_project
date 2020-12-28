import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../../hooks/http.hook'
import {AuthContext} from '../../context/AuthContext'
import {Loader} from '../Loader'
import {DisciplineCard} from './DisciplineCard'


export const DetailDiscipline = () =>{
  const {token} = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [discipline, setDiscipline] = useState('')
  const disciplineId = useParams().id
 
  const getDiscipline = useCallback(async () => {
    try {
      const fetched = await request(`/api/discipline/${disciplineId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
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
      { !loading  && <DisciplineCard discipline={discipline} /> }
    </>
  )
}
