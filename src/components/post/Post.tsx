import { FC } from "react";
import {
  PostWrapper,
  Date
} from "./Post.styled";
import dayjs from "dayjs";
import CleanContent from "../cleanContent";
import NormalLayout from "../normalLayout";
import BubbleLayout from "../bubbleLayout";
import BaseSection from "../baseSection";
import DescriptionSection from "../descriptionSection";

type PostType = {
  id: string
  created_at: string | null
  cleanBase: string
  cleanDescription: string
}

const Post: FC<PostType> = ({
  id,
  created_at,
  cleanBase,
  cleanDescription
}) => {

  return (
    <PostWrapper>
      <Date>
        { dayjs(created_at).format('D MMM YYYY, h:ss a') }
      </Date>
      <BubbleLayout>
        <BaseSection>
          <CleanContent content={cleanBase} />
        </BaseSection>
      </BubbleLayout>
      <NormalLayout>
        <DescriptionSection>
          <CleanContent content={cleanDescription}/>
        </DescriptionSection>
      </NormalLayout>
    </PostWrapper>
  )
}

export default Post