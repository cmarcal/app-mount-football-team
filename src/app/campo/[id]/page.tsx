'use client';

import { PLAYERS_IN_ROOM, ROOM_FIELD_MATCH } from "@/utils/consts"
import { getCookie, setCookie } from "@/utils/cookie"
import { goToHome } from "@/utils/routes/locations";
import { useCallback, useEffect, useState } from "react"
import MemberQueue from "./components/memberQueue";
import ArrivalList from "./components/arrivalList";
import MountTeams from "./components/mountTeams";
import PlayersByTeam from "./components/playersByTeam";

const DEFAULT_PLAYERS_BY_TEAM = 6;

export default function Page({ params }: { params: {id: string}}) {

  const [players, setPlayers] = useState<Array<Player>>([]) 
  const [playersByTeam, setPlayersByTeam] =  useState(DEFAULT_PLAYERS_BY_TEAM);

  useEffect(() => {
    const hasRoom =  getCookie(`${ROOM_FIELD_MATCH}${params.id}`) === params.id

    if (!hasRoom) goToHome();

    const playersInCookie = getCookie(`${PLAYERS_IN_ROOM}${params.id}`);
    if (playersInCookie) {
      const playersParse = JSON.parse(playersInCookie) as Array<Player>
      setPlayers(playersParse)
    }
  },[params.id])

  const updatePlayers = useCallback((players: Array<Player>) => {
    const mountCookie = {
      name: `${PLAYERS_IN_ROOM}${params.id}`,
      value: JSON.stringify(players),
    }

    setPlayers(players)
    setCookie(mountCookie)
  }, [params.id])

  const addPlayer = useCallback((player: Player): void => {
    const newPlayers = [...players, player]
    updatePlayers(newPlayers)

  },[players, updatePlayers])

  const removePlayer = useCallback((positionPlayer: number): void => {
    const copyPLayers = [...players];
    copyPLayers.splice(positionPlayer, 1)
    
    updatePlayers(copyPLayers)
  },[players, updatePlayers])

  const addPlayersByTeam = useCallback(() => {
    if (playersByTeam < 11) {
      setPlayersByTeam(playersByTeam + 1)
    }
  },[playersByTeam])

  const removePlayersByTeam = useCallback(() => {
    if (playersByTeam > 1) {
      setPlayersByTeam(playersByTeam - 1)
    }

  },[playersByTeam])


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