'use client'
import { HiOutlineTrash } from 'react-icons/hi';
import { useEffect, useState } from "react"

interface ArrivalListParams {
  players: Array<Player>;
  removePlayer: (positionPlayer: number) => void;
}

export const ArrivalList = ({ players, removePlayer }: ArrivalListParams ) => {
  const [totalMonthly, setTotalMonthly] = useState(0)
  const [totalDiarist, setTotalDiarist] = useState(0)

  useEffect(() => {
    const details = document.querySelector('details') ;
    function onClick(event: Event) {
      if (event.target === details) {
        details?.removeAttribute('open');
      }
    }
    details?.addEventListener("click", onClick) ;
  },[])
  
  useEffect(() => {
    let monthly = 0;
    let diarist = 0;

    players.forEach(({isMonthlyWorker}) => {
      isMonthlyWorker ? monthly += 1 : diarist += 1;
    })

    setTotalMonthly(monthly)
    setTotalDiarist(diarist)

  }, [players])

  return (
    <details id="details" className="relative w-full">
      <summary className='font-semibold text-slate-50'>Lista de jogadores por ordem de chegada
      <br />
      <p className='pt-2 font-normal'>
        {totalMonthly} mensalistas | {totalDiarist} diaristas
      </p>
      </summary>
      { players.length ? (
        <ul className="absolute w-full px-3 py-4 rounded-md bg-slate-50 top-8">
          {players?.map(({name, isMonthlyWorker}, idx) => (
            <li className="flex justify-between px-1 py-3 border-b" key={`${name}_${idx}`}>
              <span className="capitalize">
                {idx + 1} - { name }
              </span>
              <span className={`flex items-center text-sm gap-6 ${isMonthlyWorker ? 'text-green-500' :''}`}>
                {isMonthlyWorker ? 'Mensalista' : 'Diarista'}

                <HiOutlineTrash className='text-xl text-red-500' onClick={()=> removePlayer(idx)}/>
              </span>
            </li>
          ))}
        </ul>
      ) : undefined}
    </details>
  )
}
