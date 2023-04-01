import { Header } from '../components/Header'
import { HeaderApp } from '../components/HeaderApp'
import { SummuryTable } from '../components/SummaryTable'


export default function AplicationPage() {
  return (
    <div className='w-screen h-screen flex flex-col gap-10'>

      <HeaderApp/>  
      <div className='flex justify-center flex-col items-center mt-5'>
        <div className='w-full max-w-5xl px-6 flex flex-col gap-16'>
          <SummuryTable/>
          <Header/>
        </div>

        <div className='border-zinc-800 border-t-2 border-dotted w-full flex flex-col justify-center items-center mt-24'>

            <span className='mt-16 text-zinc-600 font-bold'>
              Em breve funcionalidades de projetos  
            </span>

            <a 
              className='text-zinc-600 font-bold'
              href="https://github.com/Marcelo-maga"
            >
              RoadMap
            </a>

        </div>  

      </div>
    </div>
  )
}
