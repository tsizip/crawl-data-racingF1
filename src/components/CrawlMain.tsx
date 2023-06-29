import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import Axios from 'axios'
import { getDataApiDrives, getDataApiRaces, getDataApiTeams, loadingApi, setDFValue, setYear } from '../reducer/dataReducer';
import _ from 'lodash';

// antd
import type { SelectProps, TableProps } from 'antd';
import { Button, Select, Space, Table } from 'antd';
import Races from './Races';
import Drivers from './Drivers';
import Teams from './Teams';
import DHL from './DHL';
import Loading from './Loading';


export interface DataType {
     key: string;
     name: string;
     age: number;
     address: string;
}



export default function CrawlMain() {

     // const [year, setYear] = useState('2023')
     const { year, dfValue } = useSelector((state: RootState) => state.rootReducer)
     // const [dfValue, setDFValue] = useState('RACES')


     const dispatch = useDispatch<AppDispatch>();
     // const { dataApi, typeRaces } = useSelector((state: RootState) => state.rootReducer)
     const data = useSelector((state: RootState) => state.rootReducer)
     const dataApiRaces = data?.dataApiRaces
     const dataApiDrivers = data?.dataApiDrivers
     const dataApiTeams = data?.dataApiTeams
     const typeRaces = data?.typeRaces
     // console.log('type races', typeRaces)

     useEffect(() => {
          if (dfValue === 'RACES') {
               try {
                    const callApi = async () => {
                         await dispatch(loadingApi(true))
                         await  Axios({
                              url: `https://ergast.com/api/f1/${year}/results/1.json`,
                              method: 'GET'
                         }).then((result) => {
                              dispatch(getDataApiRaces([result.data.MRData.RaceTable.Races, 'RACES']))
                              dispatch(loadingApi(false))
                         })
                    }
                    callApi()
               } catch (err) {
                    console.log(err)
               }
              

          } else if (dfValue === 'DRIVERS') {
               try {
                    const callApi = async () => {
                         await dispatch(loadingApi(true))
                         await Axios({
                              url: `https://ergast.com/api/f1/${year}/driverStandings.json`,
                              method: 'GET'
                         }).then((result) => {
                              dispatch(getDataApiDrives([result.data.MRData.StandingsTable.StandingsLists[0].DriverStandings, 'DRIVERS']))
                              dispatch(loadingApi(false))
                         })
                    }
                    callApi()
               } catch (err) {
                    console.log(err)
               } 
              
          } else if (dfValue === 'TEAMS') {
               console.log('TEAMS')
               try {
                    const callApi = async () => {
                         await dispatch(loadingApi(true))
                         await  Axios({
                              url: `https://ergast.com/api/f1/${year}/constructorStandings.json`,
                              method: 'GET'
                         }).then((result) => {
                              dispatch(getDataApiTeams([result.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings, 'TEAMS']))
                              dispatch(loadingApi(false))
                         })
                    }
                    callApi()
               } catch (err) {
                    console.log(err)
               } 
              
          } else {
               console.log('DHL FASTEST LAP AWARD')
               try {
                    const callApi = async () => {
                         await dispatch(loadingApi(true))
                         await  Axios({
                              url: `https://ergast.com/api/f1/${year}/fastest/1/results.json`,
                              method: 'GET'
                         }).then((result) => {
                              dispatch(getDataApiTeams([result.data.MRData.RaceTable.Races, 'DHL']))
                              dispatch(loadingApi(false))
                         })
                    }
                    callApi()
               } catch (err) {
                    console.log(err)
               }
               
          }
     }, [year, dfValue])

     const options: SelectProps['options'] = [];

     for (let i = 2000; i < 2024; i++) {
          options.push({
               value: i,
               label: i,
          });
     }


     return (
          <div className=''>

               <div className='container p-0'>
                    {
                         typeRaces === 'RACES' ? <Races dataApi={[dataApiRaces, year]} /> : typeRaces === 'DRIVERS' ? <Drivers dataApi={[dataApiDrivers, year]} /> : typeRaces === 'TEAMS' ? <Teams dataApi={[dataApiTeams, year]} /> : <DHL dataApi={[dataApiTeams, year]} />
                    }
               </div>


          </div>
     )
}