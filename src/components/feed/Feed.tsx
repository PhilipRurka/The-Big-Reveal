import { FC } from "react";
import {
  FeedListContainer,
  FeedStyled,
  Title
} from "./Feed.styled";
import PostCardList from "../postCardList";
import { PostCardListPropsType } from "../postCardList/PostCardList.container";

const Feed: FC<PostCardListPropsType> = ({
  list
}) => {
  return (
    <FeedStyled>
      <Title>
        Feed
      </Title>
      <FeedListContainer>
        <PostCardList list={list} />
      </FeedListContainer>
    </FeedStyled>
  )
}

export default Feed