'use client';
import { useOnClickOutside } from "@/hooks";
import { ReactElement, useRef, useState, useEffect } from "react";

interface ModalParams {
  title: string;
  children: ReactElement;
  isOpen: boolean;
  handleModalClick: Function;
}

export default function Modal({title = "", isOpen ,handleModalClick,children}: ModalParams) {

  const refModal = useRef(null);
  useOnClickOutside([refModal], () => handleModalClick(false));

  if (!isOpen) return null

  return (
    <dialog className="absolute top-0 left-0 z-10 bg-gray-950/30 w-screen h-screen flex items-center justify-center">
      <main ref={refModal} className="rounded-lg shadow-2xl w-2/3 z-10  px-4 py-3 bg-white">
        <div className="flex justify-between item-center relative">
          <h3>{title}</h3>
          <button
            className="
            text-xs absolute -right-7 -top-5 z-11 rounded-full flex justify-center items-center w-5 h-5 bg-zinc-900 text-white"
            onClick={() => handleModalClick(false)}>
            x
          </button>
        </div>
        <br />
        <div className="flex justify-center items-center h-auto">
          {children}
        </div>
      </main>
    </dialog>
  )
}
