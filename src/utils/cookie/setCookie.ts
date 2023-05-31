interface SetCookieParams {
  name: string,
  value: string
}

export const setCookie = ( {name, value}: SetCookieParams): void => {
  const expires = (new Date(Date.now()+ 365*86400000)).toUTCString();
  document.cookie = `${name}=${value};expires=${expires}`;
}
