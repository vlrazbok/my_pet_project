import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../../hooks/http.hook'
import {AuthContext} from '../../context/AuthContext'
import {Loader} from '../Loader'
import {useParams} from 'react-router-dom'

export const ResultList = () =>{
  const {token} = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [userResult, setUserResult] = useState()
  const disciplineId = useParams().id
 
  const getUserResult = useCallback(async () => {
    try {
      const fetched = await request(`/api/tinfo/${disciplineId}/testresult`, 'GET', null, {Authorization: `Bearer ${token}`})
      setUserResult(fetched)
    } catch (e) {}
   }, [token, disciplineId, request])

   useEffect(() => {
     getUserResult()
   }, [getUserResult])

   if(loading || userResult === undefined){
     return <Loader />
   }
  
  return(
    
    <>
    {console.log(userResult)}
    {userResult.map((user, i) => {
          return(
            <div key={i+1} >
              <table >
              <thead>
                <tr> 
                  <th>Ім'я</th>
                  <th>Прізвище</th>
                  <th>Назва</th>
                  <th>Оцінка</th>
                  <th>Результат</th>
                </tr>
              </thead>
              <tbody>
              {user.testResult.map((test, i) => {
                return(
                  <tr key={i+1} >
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{test[0]}</td>
                    <td>{test[1][0]}</td>
                    <td className="test-result">{test[1][1]} з {test[1][2]}</td>
                  </tr>
                )
              })}
              </tbody>
              </table>
            </div>
          )
        })}
    </>
  )
}