type PageType = 'Home' | 'Login'

export const initialConsole = (page: PageType): void => {
  switch (page) {
    case 'Home':
      console.log('')
      console.log(' )_) _   _ _   _     )_) _   _     _')
      console.log('( ( (_) ) ) ) )_)   /   (_( (_(   )_)')
      console.log('             (_               _) (_')
      break

    case 'Login':
      console.log('')
      console.log('o                        o--o               ')
      console.log('|             o          |   |              ')
      console.log('|    o-o o--o   o-o      O--o   oo o--o o-o ')
      console.log("|    | | |  | | |  |     |     | | |  | |-' ")
      console.log('O---oo-o o--O | o  o     o     o-o-o--O o-o ')
      console.log('            |                         |     ')
      console.log('         o--o                      o--o     ')

      break
  
    default:
      break
  }
  
  console.log('')
  console.log('------------------------------------------------------------------------------')
  console.log('The Apollo Graph Studio can be found here')
  console.log('https://studio.apollographql.com/graph/Default-Countries/explorer?variant=main')
  console.log('-----------------------------------------------------------------------------')
  console.log('')
}