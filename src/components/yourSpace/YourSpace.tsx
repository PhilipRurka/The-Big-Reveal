import { FC } from "react";
import {
  ListStatsContainer,
  Title,
  YourSpaceWrapper,
  InformationStatsSection,
  YourWorkList,
  YourWorkSection,
  InformationContainer,
  StatsContainer,
  ViewCollection,
  ShareCollection,
  StatsList,
  StatsItem,
  ShareCollectionContainer,
  CopyConfirmation,
  CopyConfirmationContainer,
  InformationStatsContainer
} from "./YourSpace.styled";
import PostCardList from "../postCardList/PostCardList";
import { YourSpaceDataType } from "../../../pages/your-space";

type YourSpaceType = {
  path: string
  username: string
  yourWorkList: YourSpaceDataType['baseData']
  handleCopy: () => void
}

const YourSpace: FC<YourSpaceType> = ({
  path,
  username,
  yourWorkList,
  handleCopy
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
        <InformationStatsSection>
          <InformationStatsContainer>
            <InformationContainer>
              <ViewCollection href={`/${path}`} >
                View your collection
              </ViewCollection>
              <ShareCollectionContainer>
                <ShareCollection onClick={handleCopy} >
                  Share your collection
                </ShareCollection>
                <CopyConfirmationContainer id='copy-to-clipboard'>
                  <CopyConfirmation>
                    Copied
                  </CopyConfirmation>
                </CopyConfirmationContainer>
              </ShareCollectionContainer>
            </InformationContainer>
            <StatsContainer>
              <StatsList>
                <StatsItem>
                  Total marked reads: #
                </StatsItem>
                <StatsItem>
                  Total responds: #
                </StatsItem>
                <StatsItem>
                  Total poems: #
                </StatsItem>
              </StatsList>
            </StatsContainer>
          </InformationStatsContainer>
        </InformationStatsSection>
      </ListStatsContainer>
    </YourSpaceWrapper>
  )
}

export default YourSpace