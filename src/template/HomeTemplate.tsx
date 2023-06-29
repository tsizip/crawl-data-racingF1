import { Alert, Select, SelectProps, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom'
import { setDFValue, setYear } from '../reducer/dataReducer';
import { RootState } from '../redux/store';



export default function HomeTemplate(props: any) {

     const dispatch = useDispatch()
     const { year, dfValue, stateSelect } = useSelector((state: RootState) => state.rootReducer)

     const handleChangeSelect = (value: string) => {

          dispatch(setYear(value))


     };

     const handleChangeDrivers = (value: string) => {
          dispatch(setDFValue(value))
     };


     const options: SelectProps['options'] = [];

     for (let i = 2000; i < 2024; i++) {
          options.push({
               value: i,
               label: i,
          });
     }
     const { loading } = useSelector((state: RootState) => state.rootReducer)
     // console.log(loading)
     // const [stateLocal, setStateLocal] = useState('block')
     // useEffect(()=>{
     //      stateSelect === 'block' ? console.log('block') : setStateLocal('none')
     // },[stateSelect])
    
     return (
          <div>


               <h1 className="text-3xl font-bold underline text-center">
                    {year} {dfValue} RESULTS
               </h1>

               <div style={{display:stateSelect}} className='mt-8 mb-8 text-center bg-gray-100 container p-3 rounded-md '>
                    <Select
                         className='mr-4'
                         defaultValue="2023"
                         style={{ width: 120 }}
                         onChange={handleChangeSelect}
                         options={options}

                    />
                    <Select
                         className='mr-4'
                         defaultValue={dfValue}
                         style={{ width: 200 }}

                         onChange={handleChangeDrivers}
                         options={[
                              { value: 'RACES', label: 'RACES' },
                              { value: 'DRIVERS', label: 'DRIVERS' },
                              { value: 'TEAMS', label: 'TEAMS' },
                              { value: 'DHL FASTEST LAP AWARD', label: 'DHL FASTEST LAP AWARD' },
                         ]}
                    />
               </div>
               {loading === true ? <div className='text-center'><Spin tip="Loading...">
               </Spin></div> : <></>}
               <Outlet/>


          </div>
     )
}