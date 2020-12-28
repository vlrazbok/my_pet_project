import React from 'react'
import {Link} from 'react-router-dom'


export const DisciplinesList = ({ disciplines }) => {
  if(!disciplines.length) {
    return <p className="center">Дисциплін поки немає</p>
  }
  return(
    <table>
      <thead>
      <tr>
        <th>№</th>
        <th>Назва</th>
        <th>Сторінка дисципліни</th>
      </tr>
      </thead>
      <tbody>
      { disciplines.map((discipline, index) => {
        return (
          <tr key={discipline._id}>
            <td>{index + 1}</td>
            <td>{discipline.name}</td>
            <td>
              <Link to={`/discipline/${discipline._id}`}>Перейти</Link>
            </td>
          </tr>
        )
      }) }
      </tbody>
    </table>
  )
}
