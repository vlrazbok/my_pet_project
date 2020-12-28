import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)
  const [userId, setUserId] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [teacherName, setTeacherName] = useState(null)
  
  const login = useCallback((jwtToken, id, role, name) => {
    setToken(jwtToken)
    setUserId(id)
    setUserRole(role)
    setTeacherName(name)

    localStorage.setItem(storageName, JSON.stringify({
      userId: id, token: jwtToken, userRole: role, 
     teacherName: name
    }))
    
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    setUserRole(null)
    setTeacherName(null)

    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token) {
      login(data.token, data.userId, data.userRole, 
         data.teacherName,
       )
    }
    setReady(true)
  }, [login])


  return { login, logout, token, userId, userRole, 
    ready, teacherName}
}