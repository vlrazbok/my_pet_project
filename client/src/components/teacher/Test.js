import React, {useContext, useState, useCallback, useEffect} from 'react'
import {AuthContext} from '../../context/AuthContext'
import {useHttp} from '../../hooks/http.hook'
import {useParams} from 'react-router-dom'

import {Loader} from '../Loader'

export const Test = () => {

  const [test, setTest] = useState()
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)
  const disciplineId = useParams().id
  const testId = useParams().id
   
  const fetchTest = useCallback( async() => {
    try{
      const fetched = await request(`/api/tinfo/${disciplineId}/${testId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setTest(fetched)
    } catch (e) {}
  }, [token, disciplineId, testId, request])
  useEffect(()=>{
    fetchTest()
  }, [fetchTest])
  if(loading || test === undefined ){
    return <Loader />
  }
  return(
    <>
      <h4>{test.name}</h4>
      {test.body.map((el, index) => {
        console.log(el)
        return(
          <div key={index+1}>
            <h5>{el.questions}</h5>
            {el.answers.map((ans, idx)=>{
              return(
                <div>
                  {idx+1}. {ans}
                </div>)
            })}
            <div>
              Правильна відповідь: {el.answers[el.correctAnswer]}
            </div>
          </div>
          
        )
      })}
    </>
  )
}