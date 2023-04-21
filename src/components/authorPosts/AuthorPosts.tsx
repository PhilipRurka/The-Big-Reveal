import { FC } from "react";
import {
  Author,
  Card,
  CardTitle,
  CreatedAt,
  AuthorPostsWrapper,
  Title,
} from "./AuthorPosts.styled";
import { AuthorPostsDataType } from "../../../pages/[...profile-path]";
import dayjs from "dayjs";

const AuthorPosts: FC<AuthorPostsDataType> = ({ cards }) => {
  return (
    <AuthorPostsWrapper>
      <Title>
        {`${ cards[0].author_username }'s collection`}
      </Title>
      {cards.map(({
        id,
        created_at,
        author_username,
        post_title
      }) => (
        <Card
          key={`AuthorPostsCard - ${created_at}`}
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
    </AuthorPostsWrapper>
  )
}

export default AuthorPosts