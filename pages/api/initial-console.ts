type PageType = 'Home' | 'Login' | 'Registration' | 'Reset Password' | 'Dashboard'

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

    case 'Registration':                                                                            
      console.log(",------.                  ,--.           ,--.                      ,--.   ,--.                  ")
      console.log("|  .--. '  ,---.   ,---.  `--'  ,---.  ,-'  '-. ,--.--.  ,--,--. ,-'  '-. `--'  ,---.  ,--,--,  ")
      console.log("|  '--'.' | .-. : | .-. | ,--. (  .-'  '-.  .-' |  .--' ' ,-.  | '-.  .-' ,--. | .-. | |      \\ ")
      console.log("|  |\\  \\  \\   --. ' '-' ' |  | .-'  `)   |  |   |  |    \\ '-'  |   |  |   |  | ' '-' ' |  ||  | ")
      console.log("`--' '--'  `----' .`-  /  `--' `----'    `--'   `--'     `--`--'   `--'   `--'  `---'  `--''--' ")
      console.log("                  `---'")

    break

    case 'Reset Password':
      console.log('    ____                        __            ____                                                         __')
      console.log('   / __ \\  ___    _____  ___   / /_          / __ \\  ____ _   _____   _____ _      __  ____    _____  ____/ /')
      console.log('  / /_/ / / _ \\  / ___/ / _ \\ / __/         / /_/ / / __ `/  / ___/  / ___/| | /| / / / __ \\  / ___/ / __  /')
      console.log(' / _, _/ /  __/ (__  ) /  __// /_          / ____/ / /_/ /  (__  )  (__  ) | |/ |/ / / /_/ / / /    / /_/ /')
      console.log('/_/ |_|  \\___/ /____/  \\___/ \\__/         /_/      \\__,_/  /____/  /____/  |__/|__/  \\____/ /_/     \\__,_/')

      break


    case 'Dashboard':
      console.log('')
      console.log('$$$$$$$\\                      $$\\       $$\\                                           $$\\')
      console.log('$$  __$$\\                     $$ |      $$ |                                          $$ |')
      console.log('$$ |  $$ | $$$$$$\\   $$$$$$$\\ $$$$$$$\\  $$$$$$$\\   $$$$$$\\   $$$$$$\\   $$$$$$\\   $$$$$$$ |')
      console.log('$$ |  $$ | \\____$$\\ $$  _____|$$  __$$\\ $$  __$$\\ $$  __$$\\  \\____$$\\ $$  __$$\\ $$  __$$ |')
      console.log('$$ |  $$ | $$$$$$$ |\\$$$$$$\\  $$ |  $$ |$$ |  $$ |$$ /  $$ | $$$$$$$ |$$ |  \\__|$$ /  $$ |')
      console.log('$$ |  $$ |$$  __$$ | \\____$$\\ $$ |  $$ |$$ |  $$ |$$ |  $$ |$$  __$$ |$$ |      $$ |  $$ |')
      console.log('$$$$$$$  |\\$$$$$$$ |$$$$$$$  |$$ |  $$ |$$$$$$$  |\\$$$$$$  |\\$$$$$$$ |$$ |      \\$$$$$$$ |')
      console.log('\\_______/  \\_______|\\_______/ \\__|  \\__|\\_______/  \\______/  \\_______|\\__|       \\_______|')

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