import type { FC } from 'react'

import { useEffect } from "react"
import Home from "./Home"
import { useAppDispatch } from "../../redux/redux_hooks";
import { init_post } from "../../redux/slices/postSlice";
import { PostPageData } from '../post/Post.type';

const HomeContainer: FC<PostPageData> = (initialValues) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(init_post(initialValues))
  }, [dispatch])
  
  return (
    <Home />
  )
}

export default HomeContainer