import { FC } from "react";
import { Title, YourSpaceWrapper } from "./YourSpace.styled";

type YourSpaceType = {
  path: string
  username: string
}

const YourSpace: FC<YourSpaceType> = ({
  path,
  username
}) => {
  return (
    <YourSpaceWrapper>
      <Title>
        Welcome to your space {username}
      </Title>
      {/* <WorkList>

      </WorkList> */}
    </YourSpaceWrapper>
  )
}

export default YourSpace