import { FC } from "react";
import {
  Poem,
  PostDisplayWrapper,
  Title
} from "./PostDisplay.styled";
import BubbleLayout from "../bubbleLayout";
import { PostDisplayType } from "./PostDisplay.container";

const PostDisplay: FC<PostDisplayType> = ({
  title,
  poem
}) => {
  return (
    <PostDisplayWrapper>
      <BubbleLayout backgroundColor='#2D1E2F' >
        <Title>
          { title }
        </Title>
        <Poem>
          { poem }
        </Poem>
      </BubbleLayout>
    </PostDisplayWrapper>
  )
}

export default PostDisplay