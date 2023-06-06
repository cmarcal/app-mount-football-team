'use client'

import { useState } from "react"
import TeamsList from "../teamsList"

interface MountTeamsParam {
  players: Array<Player>
  playersByTeam: number
}

export const MountTeams = ({ players, playersByTeam } : MountTeamsParam) => {
  const [teams, setTeams] = useState<Array<Player[]>>([])
  const hasPlayers = players.length && players.length >= (playersByTeam * 2)

  const shuffleFirstTwoTeams = (team1: Player[], team2: Player[]): {firstTeam: Player[], secondTeam: Player[]} => {
    let firstTeam: Player[] = [];
    let secondTeam: Player[] = [];

    let oneTeam = [...team1, ...team2]
    let currentIndex = oneTeam.length
    let randomIndex;

    while ( currentIndex !=0 ) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex --;
      [oneTeam[currentIndex], oneTeam[randomIndex]] = [oneTeam[randomIndex], oneTeam[currentIndex]]
    }

    firstTeam = oneTeam.slice(0, playersByTeam)
    secondTeam = oneTeam.slice(playersByTeam)

    return {
      firstTeam,
      secondTeam
    }
  }

  const mountTeams = () => {
    const monthlyPlayers: Array<Player> = []
    const diaristPlayers: Array<Player> = [] 

    players.forEach(p => {
      if(p.isMonthlyWorker) {
        monthlyPlayers.push(p)
      } else {
        diaristPlayers.push(p)
      }
    })

    const teams: Player[][] = []
    const mountTeam: Player[] = []

    const playersJoined = [...monthlyPlayers, ...diaristPlayers]

    playersJoined.forEach((player: Player) => {
      const currentTeamFull = mountTeam.length === playersByTeam

      if (currentTeamFull) {
        teams.push([...mountTeam]);
        mountTeam.length = 0
        mountTeam.push(player)
      } else {
        mountTeam.push(player)
      }
    })

    teams.push([...mountTeam]);

    const { firstTeam, secondTeam } = shuffleFirstTwoTeams(teams[0], teams[1])

    teams[0] = firstTeam;
    teams[1] = secondTeam;

    setTeams(teams);
  }

  return (
    <>
      <button 
        onClick={mountTeams}
        disabled={!hasPlayers} 
        className={`w-full text-center p-1 text-black rounded-md ${hasPlayers ? 'bg-yellow-500 cursor-auto' : 'bg-zinc-400 cursor-not-allowed'}`}>
        Montar os times
      </button>
      <TeamsList teams={teams} />
    </>
  )
}
