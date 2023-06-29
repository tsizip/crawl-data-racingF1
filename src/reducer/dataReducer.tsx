import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../redux/store';
import Axios from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
     year:'2023',
     dataApiRaces: '',
     dataApiDrivers: '',
     dataApiTeams: '',
     dataApiDHL: '',
     typeRaces:'',
     dfValue:'RACES',
     dataDetail:'',
     loading:false,
     stateSelect: 'block'
 
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
     },
     setYear:(state:RootState,action:PayloadAction<any>)=>{
          // console.log('reducer', action.payload)
          state.year = action.payload
     },
     setDFValue:(state:RootState,action:PayloadAction<any>)=>{
          // console.log('reducer', action.payload)
          state.dfValue = action.payload
     },
     handleDataDetail:(state:RootState,action:PayloadAction<any>)=>{
          // console.log('reducer', action.payload)
          state.dataDetail = action.payload
     },
     loadingApi:(state:RootState,action:PayloadAction<any>)=>{
          // console.log('reducer', action.payload)
          state.loading = action.payload
     },
     setStateSelect:(state:RootState,action:PayloadAction<any>)=>{
          // console.log('reducer', action.payload)
          state.stateSelect = action.payload
     },
  }
});

export const {getDataApiRaces,getDataApiDrives,getDataApiTeams,setYear,setDFValue,handleDataDetail,loadingApi,setStateSelect} = dataReducer.actions

export const dataReducer_ = dataReducer.reducer