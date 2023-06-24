import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../redux/store';
import Axios from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
     dataApiRaces: '',
     dataApiDrivers: '',
     dataApiTeams: '',
     dataApiDHL: '',
     typeRaces:''
 
}

const dataReducer = createSlice({
  name: 'dataReducer',
  initialState,
  reducers: {
     getDataApiRaces:(state:RootState,action:PayloadAction<any>)=>{
          // console.log('reducer', action.payload)
          state.dataApiRaces = action.payload[0]
          state.typeRaces = action.payload[1]
     },
     getDataApiDrives:(state:RootState,action:PayloadAction<any>)=>{
          // console.log('reducer', action.payload)
          state.dataApiDrivers = action.payload[0]
          state.typeRaces = action.payload[1]
     },
     getDataApiTeams:(state:RootState,action:PayloadAction<any>)=>{
          // console.log('reducer', action.payload)
          state.dataApiTeams = action.payload[0]
          state.typeRaces = action.payload[1]
     },
     getDataApiDHL:(state:RootState,action:PayloadAction<any>)=>{
          // console.log('reducer', action.payload)
          state.dataApiDHL = action.payload[0]
          state.typeRaces = action.payload[1]
     }
  }
});

export const {getDataApiRaces,getDataApiDrives,getDataApiTeams} = dataReducer.actions

export const dataReducer_ = dataReducer.reducer