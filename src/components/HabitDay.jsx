import clsx from 'clsx'
import * as Popover from '@radix-ui/react-popover'
import { ProgressBar } from './ProgressBar'
import dayjs from 'dayjs'
import { HabitsList } from './HabitsList'
import { useState } from 'react'


export function HabitDay({ amount = 0, defultCompleted = 0, date  }) {
  const [completed, setCompleted] = useState(defultCompleted)

  const colorProgress = amount > 0 ? Math.round((completed / amount) * 100) : 0

  const dayAndMonth = dayjs(date).format('DD/MM')

  const dayOfWeek = dayjs(date).format('dddd')

  function handleCompletedChange(completed) {
    setCompleted(completed)
  }

  return (
    <Popover.Root>
      <Popover.Trigger 
        className={clsx('w-10 h-10 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background', {
          
          // 'border-2 border-violet-900': dayAndMonth == dayjs().format('DD/MM'),

          'bg-zinc-900 border-2 border-zinc-800': colorProgress == 0,
          'bg-violet-900 border-violet-700': colorProgress > 0 && colorProgress < 20,
          'bg-violet-800 border-violet-600': colorProgress >= 20 && colorProgress < 40,
          'bg-violet-700 border-violet-500': colorProgress >= 40 && colorProgress < 60,
          'bg-violet-600 border-violet-500': colorProgress >= 60 && colorProgress < 80,
          'bg-violet-500 border-violet-400': colorProgress >= 80,
        })} 
      />

      <Popover.Portal>
        <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'>

          <span className='font-semibold text-zinc-400'>{dayOfWeek}</span>
          <span className='mt-1 font-extrabold leading-tight text-3xl'>{dayAndMonth}</span>

          <ProgressBar progress={colorProgress}/>
          <HabitsList date={date} onCompletedChanged={handleCompletedChange}/>

          <Popover.Arrow height={6} width={16} className='fill-zinc-900'/>
        </Popover.Content>
      </Popover.Portal>

    </Popover.Root>
  )
}