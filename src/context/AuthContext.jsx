import React, { createContext, useEffect, useState } from 'react'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from "../lib/firebase";
import { api } from '../lib/axios';


export const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [userLogged, setUserLogged] = useState({})
  const [authUser, setAuthUser] = useState(false)
  
  const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) {
        const { uid, displayName, photoURL } = user
        setUserLogged({ uid, displayName, photoURL })
        setAuthUser(true)
        navigate('/')
      } else {
        setUserLogged({})
        setAuthUser(false)
        navigate("/auth")
      }
    })
  }, [])

  function authGoogleHandler() {
    const colorUser = 0

    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider).then( async (result) => {
      if(result.user) {
        const { uid, displayName, photoURL } = result.user
        await api.post('/auth', {
          uid, displayName, photoURL, colorUser
        }).then(() => {
          setUserLogged({ uid, displayName, photoURL })
          setAuthUser(true)
          navigate('/')
        })
      }
    })
  }

  function logOut() {
    return auth.signOut().then(() => {
      console.log('banido')
    }).catch(() => {
      console.log('deu erro ao banir')
    })
  }
 
  return (
    <AuthContext.Provider value={{ userLogged, authUser, authGoogleHandler, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}