import React from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Navbar from '../components/navbar'
import {Discipline} from '../components/admin/Discipline'
import {Teacher} from '../components/admin/teacher/Teacher'
import {Student} from '../components/admin/student/Student'
import { DetailDiscipline } from '../components/admin/DetailDiscipline'
import { TeacherDetail } from '../components/admin/teacher/TeacherDetail'
import { StudentDetail } from '../components/admin/student/StudentDetail'

export const AdminPage = () =>{
  return(
    <Router>
      <Navbar /> 
      <Switch>
        <Route exact path="/discipline" component={Discipline}></Route>
        <Route exact path="/discipline/:id" component={DetailDiscipline}></Route>
        <Route exact path="/teacher" component={Teacher} />
        <Route exact path="/teacher/:id" component={TeacherDetail} />
        <Route exact path="/student" component={Student} />     
        <Route exact path="/student/:id" component={StudentDetail} />      
      </Switch>
      <Redirect to="/discipline" />
    </Router>    
  )
}