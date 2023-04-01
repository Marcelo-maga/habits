import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"


export function LoginPage() {
  const { authGoogleHandler } = useContext(AuthContext)

  return (
    <div className="w-full h-full flex flex-row  items-center">

      {/* <div className="w-full max-w-[1000px] flex items-center justify-between mt-20 mx-auto"> */}

        <div className="w-[50%]">
          {/* <img src="/src/assets/habits.png" className="mt-20" /> */}
        </div>

        <div className="w-[50%] h-screen flex flex-col items-center justify-center">

          <div className="p-8 ml-5 bg-zinc-900 rounded-lg flex flex-col gap-5">
            <strong className="text-2xl mb-6 block">Começe a organizar <br/> os seus projetos</strong>

            <button
              onClick={authGoogleHandler}
              className="bg-violet-500 uppercase 
              p-3 rounded font-bold text-sm hover:bg-violet-700 transition-colors disabled:opacity-50"
            >
              Entrar
            </button>

          </div>
        </div>


      {/* </div> */}
      



    </div>
  )
}