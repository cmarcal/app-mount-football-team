'use client'

import { useState } from "react"
import TeamsList from "../teamsList"
import { getCookie, setCookie } from "@/utils/cookie"
import { TEAM_MOUNTED_IN_MATCH } from "@/utils/consts"

const MAX_PLAYER_PER_TEAM = 6

export const MountTeams = ({ players, matchId } : {players: Array<Player>, matchId: string}) => {
  const [teams, setTeams] = useState<Array<Player[]>>([])
  const hasPlayers = players.length

  const getShuffleTeamInCookie = () => {
    const teamCookie = getCookie(`${TEAM_MOUNTED_IN_MATCH}${matchId}`)
    if (teamCookie) {
      const teamParse = JSON.parse(teamCookie) as Array<Player>
      return teamParse
    }

    return false
  }

  const shuffleFirstTwoTeams = (team1: Player[], team2: Player[]): {firstTeam: Player[], secondTeam: Player[]} => {
    const teamInCookie = getShuffleTeamInCookie()
    let firstTeam: Player[] = [];
    let secondTeam: Player[] = [];

    if (teamInCookie) {
      firstTeam = teamInCookie.slice(0, 6)
      secondTeam = teamInCookie.slice(6)
  
      return {
        firstTeam,
        secondTeam
      }
    }

    let oneTeam = [...team1, ...team2]
    let currentIndex = oneTeam.length
    let randomIndex;

    while ( currentIndex !=0 ) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex --;
      [oneTeam[currentIndex], oneTeam[randomIndex]] = [oneTeam[randomIndex], oneTeam[currentIndex]]
    }

    firstTeam = oneTeam.slice(0, 6)
    secondTeam = oneTeam.slice(6)

    setCookie( {name: `${TEAM_MOUNTED_IN_MATCH}${matchId}`, value: JSON.stringify(oneTeam)})

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

    const addPlayerInTeam = (player: Player) => {
      if (mountTeam.length < MAX_PLAYER_PER_TEAM) {
        mountTeam.push(player)
      } else {
        const newTeamWithoutRefs = [...mountTeam]
        teams.push(newTeamWithoutRefs)

        mountTeam.length = 0
        mountTeam.push(player)
      }
    }

    monthlyPlayers.forEach((mp) => {
      addPlayerInTeam(mp)
    })


    diaristPlayers.forEach((dp, idx) => {
      const lastElement = idx === diaristPlayers.length - 1
      const lastTeam = teams[teams.length - 1]

      if (lastElement) {
        if(lastTeam.length === MAX_PLAYER_PER_TEAM ) {
          teams.push(mountTeam)
          teams.push([dp])
        }

        if (mountTeam.length < MAX_PLAYER_PER_TEAM) {
          mountTeam.push(dp)
          teams.push(mountTeam)
        } 

        return
      }

      addPlayerInTeam(dp)
    })

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
        className={`w-full text-center p-1 text-slate-50 rounded-md ${hasPlayers ? 'bg-sky-400 cursor-auto' : 'bg-zinc-400 cursor-not-allowed'}`}>
        Montar os times
      </button>
      <TeamsList teams={teams} />
    </>
  )
}
