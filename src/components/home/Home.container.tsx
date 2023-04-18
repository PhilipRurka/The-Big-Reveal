import { FC } from "react"
import Home from "./Home"

const staticHookCopy = {
  title: 'The Great Reveal',
  poem: `
    We all know that two can not exist without one
    <br/>
    Its objective definition we must conceal
    <br/>
    Until a seed grows and is consumed by someone
    <br/>
    Then, and only then, we can have, The Big Reveal  
  `
}

const HomeContainer: FC = () => {
  return (
    <Home staticHookCopy={staticHookCopy} />
  )
}

export default HomeContainer