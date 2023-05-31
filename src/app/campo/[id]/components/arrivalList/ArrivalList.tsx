'use client'
import { HiOutlineTrash } from 'react-icons/hi';
import { useEffect } from "react"

interface ArrivalListParams {
  players: Array<Player>;
  removePlayer: (positionPlayer: number) => void;
}

export const ArrivalList = ({ players, removePlayer }: ArrivalListParams ) => {

  useEffect(() => {
    const details = document.querySelector('details') ;
    function onClick(event: Event) {
      if (event.target === details) {
        details?.removeAttribute('open');
      }
    }

    details?.addEventListener("click", onClick) ;


  },[])

  return (
    <details id="details" className="w-full relative">
      <summary>Ordem de chegada</summary>
      { players.length ? (
        <ul className="absolute w-full bg-slate-50 px-3 py-4 top-8 rounded-md">
          {players?.map(({name, isMonthlyWorker}, idx) => (
            <li className="border-b px-1 py-3 flex justify-between" key={`${name}_${idx}`}>
              <span className="capitalize">
                {idx + 1} - { name }
              </span>
              <span className={`flex items-center text-sm gap-6 ${isMonthlyWorker ? 'text-green-500' :''}`}>
                {isMonthlyWorker ? 'Mensalista' : 'Diarista'}

                <HiOutlineTrash className='text-red-500 text-xl' onClick={()=> removePlayer(idx)}/>
              </span>
            </li>
          ))}
        </ul>
      ) : undefined}
    </details>
  )
}
