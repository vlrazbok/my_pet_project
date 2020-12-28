import React, { useContext, useState, useRef, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {useHttp} from '../../hooks/http.hook'
import {AuthContext} from '../../context/AuthContext'

import {Modal} from './Modal'

export const TestCreator = () =>{
  const history = useHistory()
  const [test, setTest] = useState({})
  const {token} = useContext(AuthContext)
  const {request, loading} = useHttp()
  const disciplineId = useParams().id
  const modalRef = useRef()

  const openModal = () => {
    modalRef.current.openModal()
  }
  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setTest({ ...test, [event.target.name]: event.target.value })
    console.log({...test})
  } 

  const saveHandler = async () =>{
    try {
      
      const data = await request(`/api/tinfo/${disciplineId}/create-test`, 'POST', {...test},
      {Authorization: `Bearer ${token}`})
      history.push(`/tinfo/${disciplineId}/${data.test._id}`)
    } catch (e) {}
  }

  return(
    <>
      <button
        className="btn grey lighten-1 black-text"
        onClick={openModal}
        disabled={loading}
      >Створити тест</button>
      <Modal ref={modalRef}>
      <div className="row">
        
        <div className="input-field col s12">
          <input
            placeholder="Назва тесту"
            id="name"
            type="text"
            name="name"
            value={test.name}
            onChange={changeHandler}
          />
          <label htmlFor="name"></label>
        </div>   
      </div>
      <form id="create-test-form">
        <div className="row">
          <div className="input-field col s12">
            <input
              placeholder="Питання"
              id="questions"
              type="text"
              name="questions"
              value={test.questions}
              onChange={changeHandler}
            />
            <label htmlFor="questions"></label>
          </div>   
        </div>
        <div className="row answer">
          <p className="col s1">
            <label>
              <input 
              className="with-gap" 
              name="correctAnswer" 
              type="radio"  
              value="0"
              onChange={changeHandler}
              />
              <span></span>
            </label>
          </p>
          <div className="input-field col s11 ">
            <input
              placeholder="Текст відповіді"
              id="answers_0"
              type="text"
              name="answers_0"
              value={test.answers_0}
              onChange={changeHandler}
            />
            <label htmlFor="answers_0"></label>
          </div> 
        </div>
        <div className="row answer">
          <p className="col s1">
            <label>
              <input 
              className="with-gap" 
              name="correctAnswer" 
              type="radio"
              value="1"
              onChange={changeHandler}/>
              <span></span>
            </label>
          </p>
          <div className="input-field col s11 ">
            <input
              placeholder="Текст відповіді"
              id="answers_1"
              type="text"
              name="answers_1"

              value={test.answers_1}
              onChange={changeHandler}
            />
            <label htmlFor="answers_1"></label>
          </div> 
        </div>
        <div className="row answer">
          <p className="col s1">
            <label>
              <input 
              className="with-gap" 
              name="correctAnswer" 
              type="radio"  
              value="2"
              onChange={changeHandler}/>
              <span></span>
            </label>
          </p>
          <div className="input-field col s11 ">
            <input
              placeholder="Текст відповіді"
              id="answers_2"
              type="text"
              name="answers_2"

              value={test.answers_2}
              onChange={changeHandler}
            />
            <label htmlFor="answers_2"></label>
          </div> 
        </div>
      </form>
      <div className="row">
          *Після введення відповідей на питання не забудьте обрати правильну відповідь
      </div>
      <div className="model-buttons">
        <button 
          className="btn grey lighten-1 black-text"
          onClick={() => modalRef.current.close()}>
            Закрити вікно
        </button>
        
        <button 
          className="btn grey lighten-1 black-text"
          onClick={saveHandler}>
            Створити
        </button>
      </div>
      </Modal>
    </>
  )
}