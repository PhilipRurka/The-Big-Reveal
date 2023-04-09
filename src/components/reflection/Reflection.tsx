import { FC } from "react";
import {
  Card,
  CardSubtitle,
  CardTitle,
  CreatedAt,
  ReflectionWrapper,
  Title
} from "./Reflection.styled";
import { ReflectionDataType } from "../../../pages/feed/reflection";

const Reflection: FC<ReflectionDataType> = ({ publicData }) => {
  return (
    <ReflectionWrapper>
      <Title>
        Reflection
      </Title>
      {publicData.map(({
        id,
        post_title,
        post_subtitle,
        created_at
      }) => (
        <Card
          key={`ReflectionCard - ${created_at}`}
          href={`/post/${id}`}>
          <CardTitle>
            { post_title }
          </CardTitle>
          <CardSubtitle>
            { post_subtitle }
          </CardSubtitle>
          <CreatedAt>
            Created at { created_at }
          </CreatedAt>
        </Card>
      ))}
    </ReflectionWrapper>
  )
}

export default Reflection