import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../redux/store';
import Axios from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
     data: ''
}

const dataReducer = createSlice({
  name: 'dataReducer',
  initialState,
  reducers: {
     getDataApi:(state:RootState,action:PayloadAction<any>)=>{
          state.data = action.payload
     }
  }
});

export const {getDataApi} = dataReducer.actions

export const dataReducer_ = dataReducer.reducer