import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import Axios from 'axios'
import { getDataApiDrives, getDataApiRaces, getDataApiTeams } from '../reducer/dataReducer';
import _ from 'lodash';

// antd
import type { SelectProps, TableProps } from 'antd';
import { Button, Select, Space, Table } from 'antd';
import Races from './Races';
import Drivers from './Drivers';
import Teams from './Teams';
import DHL from './DHL';


export interface DataType {
     key: string;
     name: string;
     age: number;
     address: string;
}



export default function CrawlMain() {

     const [year, setYear] = useState('2023')
     const [dfValue, setDFValue] = useState('RACES')

     const dispatch = useDispatch<AppDispatch>();
     // const { dataApi, typeRaces } = useSelector((state: RootState) => state.rootReducer)
     const data = useSelector((state: RootState) => state.rootReducer)
     const dataApiRaces = data?.dataApiRaces
     const dataApiDrivers = data?.dataApiDrivers
     const dataApiTeams = data?.dataApiTeams
     const typeRaces = data?.typeRaces
     console.log('type races', typeRaces)

     useEffect(() => {
          if (dfValue === 'RACES') {
               Axios({
                    url: `https://ergast.com/api/f1/${year}/results/1.json`,
                    method: 'GET'
               }).then((result) => {
                    dispatch(getDataApiRaces([result.data.MRData.RaceTable.Races, 'RACES']))
               })
          } else if (dfValue === 'DRIVERS') {
               Axios({
                    url: `https://ergast.com/api/f1/${year}/driverStandings.json`,
                    method: 'GET'
               }).then((result) => {
                    dispatch(getDataApiDrives([result.data.MRData.StandingsTable.StandingsLists[0].DriverStandings, 'DRIVERS']))
               })
          } else if (dfValue === 'TEAMS') {
               console.log('TEAMS')
               Axios({
                    url: `https://ergast.com/api/f1/${year}/constructorStandings.json`,
                    method: 'GET'
               }).then((result) => {
                    dispatch(getDataApiTeams([result.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings, 'TEAMS']))
               })
          } else {
               console.log('DHL FASTEST LAP AWARD')
               Axios({
                    url: `https://ergast.com/api/f1/${year}/fastest/1/results.json`,
                    method: 'GET'
               }).then((result) => {
                    dispatch(getDataApiTeams([result.data.MRData.RaceTable.Races, 'DHL']))
               })
          }
     }, [year, dfValue])


     const handleChangeSelect = (value: string) => {
          setYear(value)


     };

     const handleChangeDrivers = (value: string) => {
          setDFValue(value)
     };


     const options: SelectProps['options'] = [];

     for (let i = 2000; i < 2024; i++) {
          options.push({
               value: i,
               label: i,
          });
     }

     return (
          <div className='container'>
               <h1 className="text-3xl font-bold underline text-center">
                    {year} {dfValue} RESULTS
               </h1>

               <div className='mt-8 mb-8'>
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

               {
                    typeRaces === 'RACES' ? <Races dataApi={[dataApiRaces, year]} /> : typeRaces === 'DRIVERS' ? <Drivers dataApi={[dataApiDrivers, year]} /> : typeRaces === 'TEAMS' ? <Teams dataApi={[dataApiTeams, year]} /> : <DHL dataApi={[dataApiTeams, year]} />



               }

               {/* <Races dataApi={[dataApiRaces, year]} />
               <Drivers dataApi={[dataApiDrivers, year]} /> */}
          </div>
     )
}