import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { Router } from './Router'
import './styles/global.css'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Router/>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
