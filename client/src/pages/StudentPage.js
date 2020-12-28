
import React from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import { DisciplinePage } from '../components/student/DisciplinePage'
import {NavbarStudent} from '../components/student/NavbarStudent'
import { Results } from '../components/student/Results'
import { StudentDetail } from '../components/student/StudentDetail'
import { TestPage } from '../components/student/TestPage'

export const StudentPage = () =>{
  return(
    <div>
      <Router>
        <NavbarStudent />
        <Switch>
          <Route exact path="/student-page" component={StudentDetail}></Route>
          <Route exact path="/results" component={ Results }></Route>
          <Route exact path="/discipline/:id" component={DisciplinePage}></Route>
          <Route exact path="/discipline/:id/:id" component={TestPage}></Route>
        </Switch>
        <Redirect to="/student-page" />
    </Router>
    </div>
  )
}