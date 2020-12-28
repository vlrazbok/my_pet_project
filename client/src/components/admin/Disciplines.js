import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../../hooks/http.hook'
import {AuthContext} from '../../context/AuthContext'
import {Loader} from '../Loader'
import {DisciplinesList} from './DisciplinesList'

export const Disciplines = () => {
  const [disciplines, setDisciplines] = useState([])
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)

  const fetchDisciplines = useCallback(async () => {
    try {
      const fetched = await request('/api/discipline', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setDisciplines(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    fetchDisciplines()
  }, [fetchDisciplines])

  if (loading) {
    return <Loader/>
  }
  return (
    <>
      {!loading && <DisciplinesList disciplines={disciplines} />}
    </>
  )
}
