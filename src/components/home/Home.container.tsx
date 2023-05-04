import { FC } from "react"
import Home from "./Home"

export type StaticHookCopyType = typeof staticHookCopy

const staticHookCopy = {
  post: {
    baseContent: `
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
    `,
    descriptionContent: `
      <h2 dir="ltr">Let&rsquo;s unfold what you just read</h2>
      <p dir="ltr">This poem simply states that for there to be a big reveal (objective definition), the item from which is subject to be revealed must first be consumed by someone. As a result a seed is planted and their curiosity grows.<br>&hellip; meaning<br>You can&rsquo;t share a poem&rsquo;s context until someone at the very least reads it and hungers for more.</p>
      <p dir="ltr">&nbsp;</p>
      <h2 dir="ltr">What is this?</h2>
      <p dir="ltr">This platform is designed for poets and poems enthusiasts.&nbsp;Come on in, allow others to gaze upon your work. Not only that but you can also add some context to your masterpiece. Which is art in itself.</p>
      <p dir="ltr"><br>I know this platform is riddled with issues and doesn&rsquo;t quite look appealing. I am aware c:<br>After I resolve a bunch of bugs and patch up some security issues, I aim to release the following features.</p>
      <ul>
      <li dir="ltr" role="presentation">Allow users to edit and delete their poems</li>
      <li dir="ltr" role="presentation">Have a proper 404 page</li>
      <li dir="ltr" role="presentation">Unlock some basic stats that can be seen on Your Space</li>
      <li dir="ltr" role="presentation">Allow users to mark poems as read, so they can keep track of which ones they have read</li>
      <li dir="ltr" role="presentation">Allow users to favorite poems</li>
      <li dir="ltr" role="presentation">Allow users to follow a poet</li>
      <li dir="ltr" role="presentation">Allow users to submit a response to an immediate reading of one's work. This will only be seen by the author. Eventually the author could publish their comments under their original post</li>
      <li dir="ltr" role="presentation">I am gonna bring in some search functionality</li>
      <li dir="ltr" role="presentation">Enable the use of tags on user&rsquo;s poems</li>
      <li dir="ltr" role="presentation">Eventually I am gonna find a designer for this platform.</li>
      </ul>
      <p>&nbsp;</p>
    `,
  },
  profilePath: '',
  username: '',
  created_at: ''
}

const HomeContainer: FC = () => {
  return (
    <Home {...staticHookCopy} />
  )
}

export default HomeContainer