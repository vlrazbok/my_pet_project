import React from 'react'

import {AdminPage} from './pages/AdminPage'
import {TeacherPage} from './pages/TeacherPage'
import {StudentPage} from './pages/StudentPage'
import {AuthPage} from './pages/AuthPage'

export const useRoutes = (isAuthenticated, userRole) => {
  if (isAuthenticated) {
    switch (userRole){
      case 'admin':
        return(
          <AdminPage />
        )
      case 'teacher':
        return(
          <TeacherPage />
          )
      case 'student':
        return(
          <StudentPage />
          )
      default:
        break;
    }
  }
  return (
    <AuthPage />
  )
}
