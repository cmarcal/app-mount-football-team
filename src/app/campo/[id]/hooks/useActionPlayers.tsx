import { PLAYERS_IN_ROOM } from "@/utils/consts"
import { setCookie } from "@/utils/cookie"
import { useCallback, useState } from "react"

const DEFAULT_PLAYERS_BY_TEAM = 6;
const MAX_PLAYERS_BY_TEAM = 11;
const MIN_PLAYERS_BY_TEAM = 1;

interface UseActionPlayersReturn {
  players: Player[];
  setPlayers: (players: Player[]) => void;
  playersByTeam: number;
  addPlayer: (player: Player) => void;
  removePlayer: (positionPlayer: number) => void;
  addPlayersByTeam: () => void;
  removePlayersByTeam: () => void;
}
export const useActionPlayers = ({ roomId }: { roomId: string }): UseActionPlayersReturn => {
  const [players, setPlayers] = useState<Array<Player>>([]) 
  const [playersByTeam, setPlayersByTeam] =  useState(DEFAULT_PLAYERS_BY_TEAM);

  const updatePlayers = useCallback((players: Array<Player>) => {
    const mountCookie = {
      name: `${PLAYERS_IN_ROOM}${roomId}`,
      value: JSON.stringify(players),
    }

    setPlayers(players)
    setCookie(mountCookie)
  }, [roomId])

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
    if (playersByTeam < MAX_PLAYERS_BY_TEAM) {
      setPlayersByTeam(playersByTeam + 1)
    }
  },[playersByTeam])

  const removePlayersByTeam = useCallback(() => {
    if (playersByTeam > MIN_PLAYERS_BY_TEAM) {
      setPlayersByTeam(playersByTeam - 1)
    }

  },[playersByTeam])

  return {
    players,
    setPlayers,
    playersByTeam,
    addPlayer,
    removePlayer,
    addPlayersByTeam,
    removePlayersByTeam
  }

}