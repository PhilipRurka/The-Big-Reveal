const includeTrailingSlash = (url: string) => {
  return url.charAt(url.length - 1) === '/' ? url : `${url}/`;
}

export const getRedirectURL = (path: string = '') => {
  // let url = process?.env?.NEXT_PUBLIC_VERCEL_URL ?? 'http://localhost:3000/';
  let url = 'thebigreveal.club';
    
  url = url.includes('http') ? url : `https://${url}`;
  url = includeTrailingSlash(url)
  url += path
  url = includeTrailingSlash(url)

  return url;

  // https://thebigreveal.club/reset-password
};