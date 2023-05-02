import { FC } from "react";
import { PostCardListStyled } from "./PostCardList.styled";
import PostCard from "../postCard";
import { PostCardListPropsType } from "./PostCardList.container";

const PostCardList: FC<PostCardListPropsType> = ({ list }) => {
  return (
    <PostCardListStyled>
      {list.map((card, i) => (
        <PostCard
          key={`PostCardList ${card.post_title} - ${i}`}
          id={card.base_id}
          date={card.created_at}
          username={card.profiles.username}
          title={card.post_title} />
      ))}
    </PostCardListStyled>
  )
}

export default PostCardList