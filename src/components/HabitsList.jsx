import * as Checkbox from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { api } from "../lib/axios";



export function HabitsList({ date, onCompletedChanged }) {
  const [habitsInfo, setHabitsInfo] = useState()

  const { userLogged } = useContext(AuthContext)
  
  useEffect(() => {
    api.get('/day', {
      params: {
        date: date.toISOString(),
        idGoogle: userLogged.uid
      }
    }).then(response => {
      setHabitsInfo(response.data)
    })
    
  }, [])

  async function handleToggleHabit(habitId) {
    await api.patch(`/habit/${habitId}/toggle`)

    const isHabitAlreadyCompleted = habitsInfo?.completedHabits.includes(habitId)

    let completedHabits= []

    if(isHabitAlreadyCompleted) {
      completedHabits = habitsInfo.completedHabits.filter(id => id !== habitId)
    } else {
      completedHabits = [...habitsInfo.completedHabits, habitId]
    }

    setHabitsInfo({
      possibleHabits: habitsInfo.possibleHabits,
      completedHabits
    })

    onCompletedChanged(completedHabits.length)
  }

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date())

  return (
    <div className='mt-6 flex flex-col gap-3'>
        {habitsInfo?.possibleHabits.map(habit => {
          return(
            <Checkbox.Root
              key={habit.id}
              onCheckedChange={() => handleToggleHabit(habit.id)}
              defaultChecked={habitsInfo.completedHabits.includes(habit.id)} 
              disabled={isDateInPast}
              className='flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed'
            >

              <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800
              group-data-[state=checked]:bg-green-500
              group-data-[state=checked]:border-green-500
              group-data-[state=checked]:text-white
              transition-colors
              group-focus:outline-none
              group-focus:ring-2
              group-focus:ring-violet-600
              group-focus:ring-offset-2
              group-focus:ring-offset-background'
              >
                <Checkbox.CheckboxIndicator>
                ✓
                </Checkbox.CheckboxIndicator>
              </div>
              <span className='font-semibold text-xl leading-tight
                group-data-[state=checked]:line-through
              group-data-[state=checked]:text-zinc-400'
              >
                  {habit.title}
              </span>
    
            </Checkbox.Root>
          )
        })}
    </div>
  )
}