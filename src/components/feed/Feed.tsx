import { FC } from "react";
import {
  FeedListContainer,
  FeedWrapper,
  Title
} from "./Feed.styled";
import PostCardList from "../postCardList";
import { PostCardListPropsType } from "../postCardList/PostCardList.container";

const Feed: FC<PostCardListPropsType> = ({
  list
}) => {
  return (
    <FeedWrapper>
      <Title>
        Feed
      </Title>
      <FeedListContainer>
        <PostCardList list={list} />
      </FeedListContainer>
    </FeedWrapper>
  )
}

export default Feed