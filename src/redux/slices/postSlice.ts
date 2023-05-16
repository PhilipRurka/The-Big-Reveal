import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import type { Contents, PostPageData } from '../../components/post/Post.type'
import type { RootState } from '../redux_store';

enum TargetViewEnum {
  default,
  edit,
  delete
}

type PostState = PostPageData & {
  targetView: TargetViewEnum
}

type InitPostPayload = {
  postId: string
  username: string,
  collectionPath: string
  postTitle: string
  post: Contents
  createdAt: string
  isAuthor: boolean
}

type UpdatePostPayload = {
  post: Contents
  targetView?: TargetViewEnum
}

const initialState: PostState = {
  postId: '',
  username: '',
  collectionPath: '',
  postTitle: '',
  post: {
    baseContent: '',
    descriptionContent: '',
  },
  createdAt: '',
  isAuthor: false,
  targetView: TargetViewEnum.default,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    init_post: {
      reducer(state: PostState, action: PayloadAction<InitPostPayload>) {
        return {
          ...state,
          ...action.payload
        }
      },
      prepare({
        createdAt,
        ...rest
      }: InitPostPayload) {

        return { payload: {
          ...rest,
          createdAt: dayjs(createdAt).format('D MMM YYYY, h:ss a')
        }}
      }
    },
    update_post: (state: PostState, action: PayloadAction<UpdatePostPayload>) => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      
      return {
        ...state,
        ...action.payload
      }
    },
    // FRONTEND: Is the this required?
    update_target_view: (state: PostState, action: PayloadAction<PostState>) => {
      return {
        ...state,
        ...action.payload
      }
    }
  }
});

export const {
  update_post,
  update_target_view,
  init_post
} = postSlice.actions;

export const selectPost = (state: RootState) => state.post;

export default postSlice.reducer;