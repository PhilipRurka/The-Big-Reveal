import { FC } from "react";
import { PageNotFoundStyled } from "./PageNotFound.styled";

type PageNotFoundType = {
  
}

const PageNotFound: FC<PageNotFoundType> = () => {
  return (
    <PageNotFoundStyled>
      You seem to have stumbled uppon a 404 page!
    </PageNotFoundStyled>
  )
}

export default PageNotFound