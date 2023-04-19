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
import dayjs from "dayjs";

const Reflection: FC<ReflectionDataType> = ({ postBase }) => {
  return (
    <ReflectionWrapper>
      <Title>
        Reflection
      </Title>
      {postBase.map(({
        id,
        created_at
      }) => (
        <Card
          key={`ReflectionCard - ${created_at}`}
          href={`/post/${id}`}>
          {/* <CardTitle>
            { post_title }
          </CardTitle>
          <CardSubtitle>
            { post_subtitle }
          </CardSubtitle> */}
          <CreatedAt>
            { dayjs(created_at).format('D MMM YYYY, h:ss a') }
          </CreatedAt>
        </Card>
      ))}
    </ReflectionWrapper>
  )
}

export default Reflection