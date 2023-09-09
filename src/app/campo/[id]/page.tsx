'use client';

import { PLAYERS_IN_ROOM, ROOM_FIELD_MATCH } from "@/utils/consts"
import { getCookie, setCookie } from "@/utils/cookie"
import { goToHome } from "@/utils/routes/locations";
import { useCallback, useEffect, useState } from "react"
import MemberQueue from "./components/memberQueue";
import ArrivalList from "./components/arrivalList";
import MountTeams from "./components/mountTeams";
import PlayersByTeam from "./components/playersByTeam";
import { useActionPlayers } from "./hooks/useActionPlayers";

export default function Page({ params }: { params: {id: string}}) {

  const { players, setPlayers, playersByTeam, addPlayer, removePlayer, addPlayersByTeam, removePlayersByTeam } = useActionPlayers({ roomId: params?.id })

  useEffect(() => {
    const hasRoom = getCookie(`${ROOM_FIELD_MATCH}${params.id}`) === params.id

    if (!hasRoom) goToHome();

    const playersInCookie = getCookie(`${PLAYERS_IN_ROOM}${params.id}`);
    if (playersInCookie) {
      const playersParse = JSON.parse(playersInCookie) as Array<Player>
      setPlayers(playersParse)
    }
  },[params.id, setPlayers])

  return (
    <main className="bg-[url('../img/campo.jpeg')] bg-no-repeat bg-cover flex flex-col gap-6 h-full w-screen p-8 items-center overflow-auto">
      <h1 className="text-xl font-semibold uppercase text-slate-50">Bem-vindo ao seu campo!</h1>
      <hr className="w-4/12 text-center border-yellow-500" />

      <ArrivalList players={players} removePlayer={removePlayer} />
      <PlayersByTeam playersByTeam={playersByTeam} addPlayersByTeam={addPlayersByTeam} removePlayersByTeam={removePlayersByTeam} />
      <MemberQueue addPlayer={addPlayer} />
      <MountTeams players={players} playersByTeam={playersByTeam}/>
    </main>
  )
}