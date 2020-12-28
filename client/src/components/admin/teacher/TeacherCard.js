import React from 'react'

export const TeacherCard = ({ teacher }) => {
 
  return (
    <>
      <h4>Викладач - {teacher.name}</h4>
      <p>Пошта викладача: {teacher.email}</p>
      <p>Дисципліни викладача: {teacher.disciplines}</p>
    </>
  )
}
