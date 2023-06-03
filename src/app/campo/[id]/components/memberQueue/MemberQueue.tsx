'use client'

import { FormEvent, useState } from "react";

interface MemberQueueParams {
  addPlayer: (player: Player) => void;
}

export const MemberQueue = ({ addPlayer } : MemberQueueParams ) => {
  const [playerName, setPlayerName] = useState("");
  const [isMonthlyWorker, setIsMonthlyWorker] = useState(false);

  const cleanForm = () => { 
    setIsMonthlyWorker(false);
    setPlayerName("");
  }

  const submitForm = (event: FormEvent) => {
    addPlayer({name: playerName, isMonthlyWorker})
    cleanForm();
    event.preventDefault();
  }

  return (
    <div className="flex flex-col w-full gap-4 ">
      <form className="flex flex-col gap-3 p-3 border-2 border-yellow-500 border-solid rounded-md w-100" onSubmit={submitForm}>
        <div className="flex gap-4 w-100">
          <input value={playerName} onChange={({target}) => setPlayerName(target.value)} className="w-full px-2 py-1 border-2 rounded-md" placeholder="Nome do jogador"/>
          <div className="flex items-center justify-center gap-2 p-2 rounded-md bg-slate-50 ">
            <input checked={isMonthlyWorker} onChange={({target}) => setIsMonthlyWorker(target.checked)} type="checkbox" name="mensalista" id="mensalista" className="cursor-pointer"/>
            <label htmlFor="mensalista" className="text-sm cursor-pointer">mensalista</label>
          </div>
        </div>
        <button className="p-1 text-center text-black bg-yellow-500 rounded-md w-100">Adicionar jogador na lista</button>
      </form>
    </div>
  )
}
