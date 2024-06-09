import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './atomic/pages/auth/Login'
import Signup from './atomic/pages/auth/Signup'
import Chatpage from './atomic/pages/chatpage/Chatpage'
import { UserProvider } from './UserContext'

function App() {


  return (
    <UserProvider>
    <Routes>
    
        <Route path='/' element={<Login/>}></Route>
        <Route path='/signup' element={ <Signup/>}></Route>
        <Route path='/chatpage' element={<Chatpage/>}></Route>
        
        
   
    

  </Routes>
  </UserProvider>
  )
}

export default App
