import { FC } from "react";
import {
  FeedListContainer,
  FeedWrapper,
  Title
} from "./Feed.styled";
import PostCardList from "../postCardList";
import { FeedListType } from "./Feed.container";

type FeedListPropsType = {
  list: FeedListType
}

const Feed: FC<FeedListPropsType> = ({
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