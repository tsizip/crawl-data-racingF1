import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../redux/store';
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
     value:0
}

const TestReducer = createSlice({
  name: 'second',
  initialState,
  reducers: {
     countupNumber:(state:RootState,action:PayloadAction<number>)=>{
          state.value += action.payload
          
     }
  }
});

export const {countupNumber} = TestReducer.actions

export const TestReudcer_ = TestReducer.reducer