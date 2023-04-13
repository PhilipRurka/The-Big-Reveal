import {
  Noto_Sans_Mono,
  Roboto
} from 'next/font/google'

export const noto = Noto_Sans_Mono({
  weight: ['200', '400', '600', '800'],
  subsets: [],
  variable: '--font-noto'
});

export const roboto = Roboto({
  weight: ['300', '500'],
  subsets: [],
  variable: '--font-noto'
});