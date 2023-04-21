import { FC } from "react";
import { FeedWrapper } from "./Feed.styled";
import Link from "next/link";

const Feed: FC = () => {
  return (
    <FeedWrapper>
      <Link href='/feed/your-posts'>
        Your Posts
      </Link>
      {/* <Link href='/feed/following'>
        Following
      </Link>
      <Link href='/feed/exploration'>
        Exploration
      </Link> */}
    </FeedWrapper>
  )
}

export default Feed