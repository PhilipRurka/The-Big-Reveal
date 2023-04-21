import { FC } from "react";
import {
  Author,
  Card,
  CardTitle,
  CreatedAt,
  YourPostsWrapper,
  Title,
} from "./YourPosts.styled";
import { YourPostsDataType } from "../../../pages/[...profile-path]";
import dayjs from "dayjs";

const YourPosts: FC<YourPostsDataType> = ({ cards }) => {
  return (
    <YourPostsWrapper>
      <Title>
        Your Posts
      </Title>
      {cards.map(({
        id,
        created_at,
        author_username,
        post_title
      }) => (
        <Card
          key={`YourPostsCard - ${created_at}`}
          href={`/post/${id}`}>
          <CardTitle>
            { post_title }
          </CardTitle>
          <Author>
            { author_username }
          </Author>
          <CreatedAt>
            { dayjs(created_at).format('D MMM YYYY, h:ss a') }
          </CreatedAt>
        </Card>
      ))}
    </YourPostsWrapper>
  )
}

export default YourPosts