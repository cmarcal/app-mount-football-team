'use client';
import {BsFillPersonPlusFill, BsFillPersonDashFill } from 'react-icons/bs'

interface PlayersByTeamsParams {
  playersByTeam: number;
  addPlayersByTeam: () => void;
  removePlayersByTeam: () => void;
}

export const PlayersByTeam = ({playersByTeam, addPlayersByTeam, removePlayersByTeam}: PlayersByTeamsParams) => {
  return (
    <div className='w-full'>
      <p className="pb-2 text-slate-50">Quantidade de jogadores por time</p>
      <div className='flex items-stretch gap-4'>
        <button className='px-3 text-center text-black bg-yellow-500 rounded-md' onClick={removePlayersByTeam}> <BsFillPersonDashFill /> </button> 
        <input min="0" max="11" readOnly className='px-2 py-1 text-center border-2 rounded-md' type="number" placeholder="Jogadores por time" value={playersByTeam} />
        <button className='px-3 text-center text-black bg-yellow-500 rounded-md' onClick={addPlayersByTeam}> <BsFillPersonPlusFill /> </button> 
      </div>
    </div>
  )
}
