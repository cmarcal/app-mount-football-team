export const goToField = (roomName: string): void => {
  location.href = `campo/${roomName}`
}

export const goToHome = ():void => {
  location.href = '/'
}