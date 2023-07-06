import { configureStore, type ThunkAction, type Action } from '@reduxjs/toolkit'
import requisitionsReducer from './reducer/requisitionReducer'

export const store = configureStore({
  reducer: {
    requisitions: requisitionsReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>
