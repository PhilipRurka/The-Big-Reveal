import { FC } from "react"
import Home from "./Home"

const staticHookCopy = {
  title: 'The Great Reveal',
  poem: `
    <h1 style="text-align: center;">The Great Reveal!</h1>
    <p style="text-align: center;">
      We all know that two can not exist without one
      <br>
      Its objective definition we must conceal
      <br>
      Until a seed grows and is consumed by someone
      <br>
      Then, and only then, we can have, The Big Reveal
    </p>
  `
}

const HomeContainer: FC = () => {
  return (
    <Home staticHookCopy={staticHookCopy} />
  )
}

export default HomeContainer