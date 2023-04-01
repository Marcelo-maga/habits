import * as Checkbox from "@radix-ui/react-checkbox";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { api } from "../lib/axios";

export function NewHabitForm() {
  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState([])

  const { userLogged } = useContext(AuthContext)

  const avaliableWeekDays = [
    'Domingo',
    'Segunda-Feira',
    'Terça-Feira',
    'Quarta-Feira',
    'Quinta-Feira',
    'Sexta-Feira',
    'Sábado'
  ]

  function handleToogleWeekDay(weekDay) {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithRemoveOne = weekDays.filter(day => day !== weekDay)
      setWeekDays(weekDaysWithRemoveOne)
    } else {
      const weekDaysWithAddOne = [...weekDays, weekDay]
      setWeekDays(weekDaysWithAddOne)
    }
  }

  async function createNewHabit(event) {
    event.preventDefault()

    if(!title || weekDays.length === 0) {
      return
    }

    const userGoogleId = userLogged.uid

    await api.post('/habit', {
      title, weekDays, userGoogleId
    })

    setTitle('')
    setWeekDays([])

  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">

      <label htmlFor="Title" className="font-semibold leading-tight ">
        Qual é o seu comprometimento?
      </label>

      <input
        className="p-4 rounded-lg mt-3 bg-zinc-800 placeholder:text-zinc-400
        focus:outline-none
        focus:ring-2
        focus:ring-violet-600
        focus:ring-offset-2
        focus:ring-offset-zinc-900
        "
        type='text' 
        id="title" 
        placeholder="" 
        autoFocus
        onChange={event => setTitle(event.target.value)}
        value={title}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">Selecione os dias da semana:</label>

      <div className="flex flex-col gap-2 mt-3">
        {
          avaliableWeekDays.map((weekDay, index) => {
            return (
              <Checkbox.Root checked={weekDays.includes(index)} key={weekDay} onCheckedChange={() => handleToogleWeekDay(index)} className='flex items-center gap-3 group focus:outline-none'>
                <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800
                  group-data-[state=checked]:bg-green-500
                  group-data-[state=checked]:border-green-500
                  group-data-[state=checked]:text-white
                  transition-colors
                  focus:outline-none
                  group-focus:ring-2
                  group-focus:ring-violet-600
                  group-focus:ring-offset-2
                  group-focus:ring-offset-zinc-900'
                >
                  <Checkbox.CheckboxIndicator>
                    ✓
                  </Checkbox.CheckboxIndicator>
                </div>
              <span 
                className='text-white leading-tight'>
                {weekDay}
              </span>

            </Checkbox.Root>
            )
          })
        }

      </div>


      <button
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors
        focus:outline-none
        focus:ring-2
        focus:ring-green-600
        focus:ring-offset-2
        focus:ring-offset-zinc-900"
        type="submit"
      >
        Confirmar
      </button>

    </form>
  )
}