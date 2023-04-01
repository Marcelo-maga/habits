import * as Avatar  from "@radix-ui/react-avatar"
import * as Popover from '@radix-ui/react-popover'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"

export function HeaderApp() {

  const { userLogged, logOut } = useContext(AuthContext)

  const photo = userLogged.photoURL

  return (
    <div className="w-full h-10 flex flex-row items-center justify-between px-10 py-12 border-b-2 border-zinc-900">

      <h1 className="font-bold text-2xl">Ohayo</h1>

      <Popover.Root>
        <Popover.Trigger>
          <Avatar.Root>

            
            <Avatar.Image
              className="rounded-[100%] w-14 h-14"
              src={photo}
              alt="Your Photo"
            />

            <Avatar.Fallback className="p-4 border-2 border-zinc-800 rounded-lg font-bold">
              {userLogged.displayName}
            </Avatar.Fallback>


          </Avatar.Root>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'>

            {/* Implementar um menu de configurações, e começar a pensar em uma página de user */}

            {/* <span className="mb-5 font-semibold">
              Você esta logado <br/>
              como <span className="font-bold">{userLogged.displayName}</span>
            </span> */}

            <button
              className="px-6 py-4 bg-red-500 rounded-lg font-bold"
              onClick={logOut}
            >
              Sair
            </button>


            <Popover.Arrow height={6} width={16} className='fill-zinc-900'/>
          </Popover.Content>
        </Popover.Portal>

      </Popover.Root>

    </div>
  );
}
