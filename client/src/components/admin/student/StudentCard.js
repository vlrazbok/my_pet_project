import React from 'react'
import {Loader} from '../../Loader'
export const StudentCard = ({ student }) => {
  if (!student) {
    return <Loader/>
  }
 
  return (
    <>
      <h4>Студент - {student.firstName} {student.lastName}</h4>
      <p><b>Пошта:</b> {student.email}</p>
      <p><b>Група:</b> {student.group}</p>
      <p><b>Дисципліни:</b> {student.disciplines.map((name)=> <>{name}, </> )}</p>
      <p><b>Результати тестувань:</b> {student.testResult.map((name)=> <div>{name[0]}, оцінка {name[1][0]}</div> )}</p>

      
    </>
  )
}
