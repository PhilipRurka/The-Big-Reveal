import { FC } from "react";
import { CleanContentType } from "./CleanContent.container";

const CleanContent: FC<CleanContentType> = ({ content }) => (
  <div
    style={{
      display: 'inline-block',
      width: '100%'
    }}
    dangerouslySetInnerHTML={{ __html: content }} />
)

export default CleanContent