import styled from 'styled-components';
import { default as LinkNext } from 'next/link'
import { Colors, Container } from '../../styled';

const sharedInformationItem = {
  color: Colors.eucalyptus
}

export const YourSpaceStyled = styled.div`
  ${Container('lg')}
  padding-top: 50px;
`;

export const Title = styled.h1`
  font-size: 40px;
`;

export const ListStatsContainer = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
`;

export const YourWorkList = styled.ul`
  
`;

export const InformationStatsSection = styled.section`
  
`;

export const InformationStatsContainer = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  padding: 23px 25px;
`;

export const YourWorkSection = styled.section`
  
`;

export const InformationContainer = styled.div`
  font-weight: 300;
`;

export const StatsContainer = styled.div`
  margin-top: 30px;
  font-weight: 300;
`;

export const ViewCollection = styled(LinkNext)`
  ${sharedInformationItem}
  
`;

export const ShareCollectionContainer = styled.div`
  position: relative;
`;

export const ShareCollection = styled.button`
  ${sharedInformationItem}
  margin-top: 10px;
`;

export const CopyConfirmationContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  border-radius: 10px;
  background-color: ${Colors.limedSpruce};
  opacity: 0;
`;

export const CopyConfirmation = styled.span`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  color: white;
  text-align: center;
  font-size: 12px;
  letter-spacing: 0.5px;
`;

export const StatsList = styled.ul`
  
`;

export const StatsItem = styled.li`
  margin-top: 10px;

  &:first-child {
    margin-top: 0;
  }
`;