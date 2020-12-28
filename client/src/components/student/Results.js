import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../../hooks/http.hook'
import {AuthContext} from '../../context/AuthContext'
import {Loader} from '../Loader'

export const Results = () => {

  const {token, userId} = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [results, setResults] = useState()

  const getResults= useCallback(async () => {
    try {
      const fetched = await request(`/api/student-page/${userId}/results`, 'GET', null, {Authorization: `Bearer ${token}`})
      setResults(fetched)
    } catch (e) {}
   }, [token, userId, request])

   useEffect(() => {
     getResults()
   }, [getResults])

   if(loading || results === undefined){
    return <Loader />
  }

  return(
    <>
      <div className="row">
      <table className="col s6 offset-s3">
        <thead>
          <tr> 
            <th>Назва тесту</th>
            <th>Оцінка</th>
            <th className="test-result">Правильні відповіді</th>
          </tr>
        </thead>
        <tbody>
          
        {results.testResult.map((test, i) => {
          return(
            <tr key={i+1} >
              <td>{test[0]}</td>
              <td>{test[1][0]}</td>
              <td className="test-result">{test[1][1]} з {test[1][2]}</td>
            </tr>
          )
        })}
        </tbody>
      </table>
      </div>
    </>
  )
}