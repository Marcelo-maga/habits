import dayjs from "dayjs"
import clsx from 'clsx'
import { useContext, useEffect, useState } from "react"
import { api } from "../lib/axios"
import { generateDatesFromYearBegining } from "../utils/generate-dates-from-year-begining"
import { HabitDay } from "./HabitDay"
import { AuthContext } from "../context/AuthContext"

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']


const summaryDates = generateDatesFromYearBegining()

const minimumSummaryDatesSize = 20 * 7
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length


export function SummuryTable() {
  const [summary, setSummary] = useState([])
  const { userLogged } = useContext(AuthContext)

  const userGoogleId = userLogged.uid

  useEffect(() => {
    api.get(`/summary/${userGoogleId}`).then(response => {
      console.log(response)
      setSummary(response.data)
    })
  }, [])

  return (


    <div className="w-full   flex">


      <div className="grid grid-rows-7 grid-flow-row gap-3 pt-1 pb-6">
        {weekDays.map((weekDay, i) => {

          return (
            <div
              key={`${weekDay}-${i}`}
              className={clsx('text-zinc-400 font-bold text-xl h-10 w-10 flex items-center justify-center border-r-2 mr-4 border-r-zinc-900', {
                'border-r-violet-800': i == dayjs().day()
              })}
            >
              {weekDay}
            </div>
          )
        })}
      </div>

      <div className="overflow-auto scrollbar scrollbar-thumb-purple-500 scrollbar-track-zinc-800 scrollbar-w-3 px-1 pt-1 pb-6">
        <div className="grid grid-rows-7 grid-flow-col gap-3 ">

          {summary.length > 0 && summaryDates.map(date => {
            const dayInSummary = summary.find(day => {
              return dayjs(date).isSame(day.date, 'day')
            })

            return (
              <HabitDay
                key={date.toString()}
                date={date}
                amount={dayInSummary?.amount}
                defultCompleted={dayInSummary?.completed}
              />
            )
          })}

          {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => {
            return (
              <div
                key={i}
                className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 opacity-40 cursor-not-allowed rounded-lg"
              />
            )
          })}

        </div>
      </div>
    </div>

  )
}