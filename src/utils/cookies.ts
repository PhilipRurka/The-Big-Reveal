type SetCookie = (
  cname: string,
  value: string,
  exDays: number
) => void

type GetCookies = (cname: string) => string

export const setCookie: SetCookie = (cname, value, exDays) => {
  const date = new Date()
  const getTime = date.getTime() + (exDays * 24 * 60 * 60 * 1000)
  date.setTime(getTime)
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${cname}=${value}; ${expires}; path=/";`
}

export const getCookie: GetCookies = (cname) => {
  let name = `${cname}=`
  let decodedCookie = decodeURIComponent(document.cookie)
  let items = decodedCookie.split(';')
  for (let i = 0; i < items.length; i++) {
    let item = items[i]
    while(item.charAt(0) === ' ') {
      item = item.substring(1)
    }

    if(item.indexOf(name) == 0) {
      return item.substring(name.length, item.length)
    }
  }
  
  return ''
}