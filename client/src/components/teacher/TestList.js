import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../../hooks/http.hook'
import {AuthContext} from '../../context/AuthContext'
import {Loader} from '../Loader'
import {useParams} from 'react-router-dom'

import {Link} from 'react-router-dom'


export const TestList = () => {
  const {token} = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [testName, setTestName] = useState()
  const disciplineId = useParams().id
 


  const getTest = useCallback(async () => {
    try {
      const fetched = await request(`/api/tinfo/${disciplineId}/testlist`, 'GET', null, {Authorization: `Bearer ${token}`})
      setTestName(fetched)
    } catch (e) {}
   }, [token, disciplineId, request])

   useEffect(() => {
     getTest()
   }, [getTest])

   if(loading || testName === undefined){
     return <Loader />
   }
   return(
     <>
      <div className="row">
      <table className="col s11">
        <thead>
          <tr> 
            <th>Існуючі тести</th>
            <th>Сторінка тесту</th>
          </tr>
        </thead>
        <tbody>
          
        {testName.test.map((test) => {
          return(
            <tr key={test._id}>
              <td>{test.name}</td>
              <td>
                <Link to={`/tinfo/${disciplineId}/${test._id}`}>Перейти</Link>
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
      </div>
     </>
   )
}