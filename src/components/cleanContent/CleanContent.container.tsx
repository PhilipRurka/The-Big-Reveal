import { FC, useMemo } from "react"
import CleanContent from "./CleanContent"
import * as DOMPurify from 'isomorphic-dompurify';

export type CleanContentType = {
  content: string
}

const CleanContentContainer: FC<CleanContentType> = ({
  content
}) => {
  const cleanContent = useMemo(() => DOMPurify.sanitize(content, {USE_PROFILES: {html: true}}), [content])

  return (
    <CleanContent content={cleanContent} />
  )
}

export default CleanContentContainer