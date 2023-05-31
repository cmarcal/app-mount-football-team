import React from 'react'
import { GiSoccerKick } from 'react-icons/gi'

interface TeamListParams {
  teams: Array<Player[]>
}

export const TeamsList = ({ teams } : TeamListParams) => {
  if (!teams.length) return null

  return (
    <>
      {
        teams?.map((team, idx) => {
          const teamName = `Time ${idx + 1}`
          return(
            <ul className='bg-sky-100 px-4 py-2 w-full flex  flex-col gap-2 border-2 border-solid border-sky-500 rounded-md' key={teamName}>
              <h3 className='text-sky-800 text-lg'> {teamName} </h3>
              <hr className='w-6/12 border-slate-800'/>
              {team.map(( { name, isMonthlyWorker }, idx2) => {
                return (
                  <li className='p-1 rounded-md capitalize flex items-center gap-2 bg-white' key={name + idx2}>
                    <GiSoccerKick className='text-3xl'/>
                    <div className='flex flex-col'>
                      <span className='text-sm'>
                        {name}
                      </span>
                      <span className='text-[12px] text-slate-500'>
                        {isMonthlyWorker ? 'Mensalista' : 'Diariasta'}
                      </span>
                    </div> 
                  </li>
                )
              })}
            </ul>
          )
        })
      }
    </>
  )
}
