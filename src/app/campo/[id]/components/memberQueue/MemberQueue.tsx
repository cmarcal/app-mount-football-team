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
    <div className="flex flex-col gap-4 w-full">
      <h2 className=""> <i className="fa-solid fa-user"/> Fila de chegada</h2>

      <form className="w-100 flex flex-col gap-3 border-2 border-solid border-sky-500 rounded-md p-3" onSubmit={submitForm}>
        <div className="flex gap-4 w-100">
          <input value={playerName} onChange={({target}) => setPlayerName(target.value)} className="border-2 rounded-md px-2 py-1 w-full" placeholder="Nome do jogador"/>
          <div className="flex items-center justify-center gap-2 bg-slate-50 rounded-md p-2 ">
            <input checked={isMonthlyWorker} onChange={({target}) => setIsMonthlyWorker(target.checked)} type="checkbox" name="mensalista" id="mensalista" className="cursor-pointer"/>
            <label htmlFor="mensalista" className="cursor-pointer text-sm">mensalista</label>
          </div>
        </div>
        <button className="w-100 text-center bg-sky-400 p-1 text-slate-50 rounded-md"> Adicionar na lista</button>
      </form>
    </div>
  )
}
