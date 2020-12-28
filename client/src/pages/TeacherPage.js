import React from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import { TeacherInfo } from '../components/teacher/TeacherInfo'
import {NavbarTeacher} from '../components/teacher/NavbarTeacher'
import { DisciplineInfo } from '../components/teacher/DisciplineInfo'
import { Test } from '../components/teacher/Test'
export const TeacherPage = () =>{
  return(
    <Router>
      <NavbarTeacher />
      <Switch>
        <Route exact path="/tinfo" component={TeacherInfo}></Route>
        <Route exact path="/tinfo/:id" component={DisciplineInfo}></Route>
        <Route exact path="/tinfo/:id/:id" component={Test}></Route>
      </Switch>
      <Redirect to="/tinfo" />
    </Router>
  )
}