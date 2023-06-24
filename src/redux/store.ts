import { configureStore } from '@reduxjs/toolkit'
import { TestReudcer_ } from '../reducer/TestReducer'
import { dataReducer_ } from '../reducer/dataReducer'


const store: any = configureStore({
     reducer: {
          rootReducer: dataReducer_
     },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store