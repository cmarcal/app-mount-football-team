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
    const hasRoom = getCookie(ROOM_FIELD_MATCH) === roomName

    if (hasRoom) {
      goToField(roomName)
    } else {
      event.preventDefault();
      setShowMessageError(true);
    }
  }

  return (
    <>
      <button 
        className="rounded-md shadow-xl p-3 bg-sky-500 text-slate-50"
        onClick={() => handleOpenModal(true)}>
        Entre no campo
      </button>

      <Modal
          title="Encontre sua sala" 
          isOpen={openModal} 
          handleModalClick={handleOpenModal}>
          <form
            className="flex w-full flex-col gap-3" 
            onSubmit={goToRoom}>
            <input
              className='border-2 rounded-md px-2 py-1'
              value={roomName} 
              placeholder="Ache seu campo" 
              onChange={({target}) => setRoomName(target.value)} 
              onFocus={()=> setShowMessageError(false)}/>
            {showErrorMessage && <p className='text-center text-sm text-red-400'>Não foi possível encontrar o campo!</p>}
            <button className='bg-sky-500 rounded-lg text-slate-50 p-1'>ir para sala!</button>
          </form>
        </Modal>
    </>
  )
}
