import { FC } from "react";
import YourPosts from "./YourPosts";
import { YourPostsDataType } from "../../../pages/feed/your-posts";

const YourPostsContainer: FC<YourPostsDataType> = ({ cards }) => {
  return (
    <YourPosts cards={cards} />
  )
}

export default YourPostsContainer