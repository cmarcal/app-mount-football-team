'use client';

import { CHARACTERS, ROOM_FIELD_MATCH } from "@/utils/consts";
import { setCookie, getCookie } from "@/utils/cookie";
import { goToField } from "@/utils/routes";
import FindRoomModal from "../findRoomModal";

const GenerateField = () => {

  const createRoom = () => {
    let result = '';
    const charactersLength = CHARACTERS.length;
    let counter = 0;
    while (counter < 7) {
      result += CHARACTERS.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  const generateField = (): void =>  { 
    const room = createRoom();
    const hasRoom = getCookie(`${ROOM_FIELD_MATCH}${room}`) === room

    if(!hasRoom) {
      setCookie({name: `${ROOM_FIELD_MATCH}${room}`, value: room})
    }
    goToField(room)
  }



  return (
    <div className="flex flex-col items-center gap-y-4">
      <button 
        className="p-2 text-black bg-yellow-500 rounded-full shadow-xl w-60"
        onClick={generateField}>
          Monte os times
      </button>
     <FindRoomModal />
    </div>

  )
}

export default GenerateField;
