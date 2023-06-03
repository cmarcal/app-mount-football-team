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
            <ul className='flex flex-col w-full gap-2 px-4 py-2 border-2 border-yellow-500 border-solid rounded-md' key={teamName}>
              <h3 className='text-lg text-slate-50'> {teamName} </h3>
              <hr className='w-6/12 border-yellow-500'/>
              {team.map(( { name, isMonthlyWorker }, idx2) => {
                return (
                  <li className='flex items-center gap-2 p-1 capitalize rounded-md bg-slate-300/60' key={name + idx2}>
                    <GiSoccerKick className='text-3xl'/>
                    <div className='flex flex-col'>
                      <span className='text-sm font-semibold'>
                        {name}
                      </span>
                      <span className='text-[12px] text-black'>
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
