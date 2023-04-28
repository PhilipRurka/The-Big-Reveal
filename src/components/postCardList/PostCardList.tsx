import { FC } from "react";
import { PostCardListWrapper } from "./PostCardList.styled";
import PostCard from "../postCard";
import { PostCardListPropsType } from "./PostCardList.container";

const PostCardList: FC<PostCardListPropsType> = ({ list }) => {
  return (
    <PostCardListWrapper>
      {list.map((card, i) => (
        <PostCard
          key={`PostCardList ${card.post_title} - ${i}`}
          id={card.id}
          date={card.created_at}
          username={card.profiles.username}
          title={card.post_title} />
      ))}
    </PostCardListWrapper>
  )
}

export default PostCardList