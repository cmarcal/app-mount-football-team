'use client'

import { FormEvent, useEffect, useState } from 'react'
import { Modal } from '@/components/modal'
import { getCookie } from '@/utils/cookie';
import { ROOM_FIELD_MATCH } from '@/utils/consts';
import { goToField } from '@/utils/routes';

export default function FindRoomModal() {
  const [openModal, setOpenModal] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [showErrorMessage, setShowMessageError] = useState(false);

  useEffect(() => {
    setShowMessageError(false);
    setRoomName("");
  },[openModal])

  const handleOpenModal = (shouldShow: boolean): void => {
    setOpenModal(shouldShow)
  }

  const goToRoom = (event: FormEvent): void => {
    const hasRoom = getCookie(`${ROOM_FIELD_MATCH}${roomName}`) === roomName

    if (hasRoom) {
      goToField(roomName)
    } else {
      setShowMessageError(true);
    }
    event.preventDefault();
  }

  return (
    <>
      <button 
        className="p-2 text-black bg-yellow-500 rounded-full shadow-xl w-60"
        onClick={() => handleOpenModal(true)}>
        Entre no campo
      </button>

      <Modal
          title="Encontre sua sala" 
          isOpen={openModal} 
          handleModalClick={handleOpenModal}>
          <form
            className="flex flex-col w-full gap-3" 
            onSubmit={goToRoom}>
            <input
              className='px-2 py-1 border-2 rounded-md'
              value={roomName} 
              placeholder="Ache seu campo" 
              onChange={({target}) => setRoomName(target.value)} 
              onFocus={()=> setShowMessageError(false)}/>
            {showErrorMessage && <p className='text-sm text-center text-red-400'>Não foi possível encontrar o campo!</p>}
            <button className='p-1 text-black bg-yellow-500 rounded-lg'>ir para sala!</button>
          </form>
        </Modal>
    </>
  )
}
