import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../../hooks/http.hook'
import {AuthContext} from '../../context/AuthContext'
import {useHistory} from 'react-router-dom'

export const CreateDiscipline = () =>{
  const history = useHistory()
  const auth = useContext(AuthContext)
  const {request} = useHttp()
  const [discipline, setDiscipline] = useState('')

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        const data = await request('/api/discipline/discipline-create', 'POST', {name: discipline}, {
          Authorization: `Bearer ${auth.token}`
        })
        history.push(`/discipline/${data.discipline._id}`)
      } catch (e) {}
    }
  }

  return(
    <div className="row">
      <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
        <div className="input-field">
          <input
            placeholder=""
            id="discipline"
            type="text"
            value={discipline}
            onChange={e => setDiscipline(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="discipline">Введіть назву нової дисципліни</label>
        </div>
      </div>
    </div>
  )
}

