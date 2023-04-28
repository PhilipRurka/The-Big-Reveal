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
import PostCardList from "../postCardList";
import { PostCardListType } from "../postCardList/PostCardList.container";

type YourSpaceType = {
  list: PostCardListType
  handleCopy: () => void
  username: string
  path: string
}

const YourSpace: FC<YourSpaceType> = ({
  path,
  username,
  list,
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
            <PostCardList list={list} />
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