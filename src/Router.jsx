import AplicationPage from "./pages/ApplicationPage"
import { Route, Routes, useNavigate } from "react-router-dom"
import { LoginPage } from "./pages/LoginPage"
import { PrivateRoute } from "./utils/PrivateRoute"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"


export function Router() {
  const { authUser } = useContext(AuthContext)
  const navigate = useNavigate()

  return(
    <Routes>

      <Route path="/" 
        element={
          <PrivateRoute>
            <AplicationPage/>
          </PrivateRoute>
        }  
      />

      <Route path="/auth" element={<LoginPage/>}>
        {/* { authUser ? navigate('/') : false } */}
      </Route>

    </Routes>
  )
}