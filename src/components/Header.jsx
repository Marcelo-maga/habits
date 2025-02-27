import * as Dialog from '@radix-ui/react-dialog'
import logoImage from '../assets/logo.svg'
import { NewHabitForm } from './NewHabitForm'


export function Header() {
  return (        
        <div className='w-full max-w-3xl mx-auto flex flex-row-reverse items-center justify-center'>

          <Dialog.Root>

            <Dialog.Trigger
              type='button'
              className='border border-violet-700 bg-violet-700 font-semibold rounded-lg px-6 py-4
              hover:border-violet-400
              transition-colors
              focus:outline-none
              focus:ring-2
              focus:ring-violet-600
              focus:ring-offset-2
              focus:ring-offset-background'
            >
              + Novo Habito
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.DialogOverlay className='w-screen h-screen bg-black/80 fixed inset-0 '/>

              <Dialog.Content className='absolute p-10 bg-zinc-900 rounded-2xl w-[95%] max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <Dialog.Close className='absolute right-6 top-6 font-bold rounded-lg text-zinc-400 hover:text-zinc-200
                  focus:outline-none
                  focus:ring-2
                  focus:ring-violet-600
                  focus:ring-offset-2
                  focus:ring-offset-zinc-900'
                >
                  X
                </Dialog.Close>

                <Dialog.Title className='text-3xl leading-tight font-extrabold'>
                  Criar novo Hábito
                </Dialog.Title>

                <NewHabitForm/>

              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
  )
}