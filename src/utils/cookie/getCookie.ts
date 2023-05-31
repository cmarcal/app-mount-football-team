export const getCookie = (name : string): string => {
  if (!document.cookie) return ''

  const cookieList = document.cookie.split(";")
  const findCookie = cookieList.find(cookie => cookie.trim().startsWith(`${name}=`))
  
  return findCookie?.split("=")[1] || ""
}