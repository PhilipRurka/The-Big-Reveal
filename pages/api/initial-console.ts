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