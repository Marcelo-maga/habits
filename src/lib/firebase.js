import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyD5x805mEJwsTmMeCS5t6O4jzoPzN2Zz7Y",
  authDomain: "ohayo-marcelo-maga.firebaseapp.com",
  projectId: "ohayo-marcelo-maga",
  storageBucket: "ohayo-marcelo-maga.appspot.com",
  messagingSenderId: "711311170896",
  appId: "1:711311170896:web:c1ab7acf42170c5ca6a055",
  measurementId: "G-8DF1B8P88W"
}

const googleApp = initializeApp(firebaseConfig)
const analytics = getAnalytics(googleApp)

export const auth = getAuth(googleApp)
