import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import {Loader} from './components/Loader'
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/AuthContext'
import 'materialize-css'

function App() {
  const {token, login, logout, userId, 
    userRole, ready, teacherName
    } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated, userRole)

 if(!ready){
   return <Loader />
 }
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated, 
      userRole, teacherName
    }}>
      <Router>
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  )
}
export default App;
