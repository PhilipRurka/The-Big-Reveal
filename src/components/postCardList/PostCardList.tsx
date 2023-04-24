import { FC } from "react";
import { PostCardListWrapper } from "./PostCardList.styled";
import PostCard from "../postCard";
import { FeedListPropsType } from "../feed/Feed";

const PostCardList: FC<FeedListPropsType> = ({ list }) => {
  return (
    <PostCardListWrapper>
      {list.map((card, i) => (
        <PostCard
          key={`PostCardList ${card.post_title} - ${i}`}
          id={card.id}
          date={card.created_at}
          username={card.author_username}
          title={card.post_title} />
      ))}
    </PostCardListWrapper>
  )
}

export default PostCardList