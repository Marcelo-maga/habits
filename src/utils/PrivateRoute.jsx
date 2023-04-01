import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"


export function PrivateRoute({ children }) {
  const navigate = useNavigate()

  const { authUser } = useContext(AuthContext)

  return authUser ? children : navigate('/auth');
  
}