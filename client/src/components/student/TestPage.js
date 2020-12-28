import React, {useContext, useState, useCallback, useEffect} from 'react'
import {AuthContext} from '../../context/AuthContext'
import {useHttp} from '../../hooks/http.hook'
import {useParams} from 'react-router-dom'
import {Loader} from '../Loader'
import './student.css'
import { Camera } from './Camera'
import {useHistory} from 'react-router-dom'

export const TestPage = () => {
  
  const history = useHistory()
  const [test, setTest] = useState()
  const {loading, request} = useHttp()
  const {token, userId} = useContext(AuthContext)
  const disciplineId = useParams().id
  const testId = useParams().id

  useEffect(() => {
    window.M.updateTextFields()
  }, [])
  
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

  const Score = async() =>{
    var inputs = document.querySelectorAll('input[type=radio]');
    var score = 0
    var testResult = 0
    var allResults = []
    for (var i = 0;  i < inputs.length; i++) {
      
      if(inputs[i].checked){
        if(inputs[i].value == test.body[ Number(inputs[i].name)].correctAnswer){
          console.log(inputs[i],' Відповідь вірна')
          score = score + 1
        }else{
          console.log(inputs[i],' Відповідь не вірна')
        }
      }
    }
    testResult = (score/test.body.length).toFixed(2)
    allResults = [testResult, score, test.body.length]
    try {
      await request(`/api/student-page/save-result`, 'POST', {test, userId, allResults},
      {Authorization: `Bearer ${token}`})
      window.location.reload()
      history.push('/student-page')
    } catch (e) {}
  }
  
  return(
    <div className="row">
      <div className="col s8">
        <h4>{test.name}</h4>
        <div>
          {test.body.map((el, index) => {
            return(
            <div key={index+1}>
              <div >
                
                  <h5>{el.questions}</h5>
                  {el.answers.map((ans, idx)=>{
                    return(
                     
                        <div key={idx+1}>
                        <label className="test-label">
                          <input 
                          className="with-gap" 
                          name={index} 
                          type="radio"  
                          value={idx}
                          disabled={true}
                          />
                          <span>{ans}</span>
                        </label>
                        <div>
                        </div>
                      </div>)
                  })}
              </div>
            </div>
            )
          })}
        </div>
        <button 
          className="btn grey lighten-1 black-text"
          onClick={Score}
          >Завершити тест</button> 
      </div>
      <div className="col s4">
        <Camera />
      </div>
    </div>
  )
}