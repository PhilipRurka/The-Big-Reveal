import { FC } from "react";
import {
  ListStatsContainer,
  Title,
  YourSpaceWrapper,
  YourStatsSection,
  YourWorkList,
  YourWorkSection
} from "./YourSpace.styled";
import PostCardList from "../postCardList/PostCardList";
import { YourSpaceDataType } from "../../../pages/your-space";

type YourSpaceType = {
  path: string
  username: string
  yourWorkList: YourSpaceDataType['baseData']
}

const YourSpace: FC<YourSpaceType> = ({
  path,
  username,
  yourWorkList
}) => {
  return (
    <YourSpaceWrapper>
      <Title>
        Welcome to your space {username}
      </Title>
      <ListStatsContainer>
        <YourWorkSection>
          <YourWorkList>
            <PostCardList list={yourWorkList} />
          </YourWorkList>
        </YourWorkSection>
        <YourStatsSection>

        </YourStatsSection>
      </ListStatsContainer>
    </YourSpaceWrapper>
  )
}

export default YourSpace