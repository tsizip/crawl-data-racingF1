import React, { useEffect, useState } from 'react'
import puppeteer from 'puppeteer';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { countupNumber } from '../reducer/TestReducer';
import Axios from 'axios'
import { getDataApi } from '../reducer/dataReducer';

export default function CrawlMain() {

     const dispatch = useDispatch<AppDispatch>();
     const { data } = useSelector((state: RootState) => state.reducerr)
     console.log(data)

     useEffect(() => {
          Axios({
               url: 'https://ergast.com/api/f1/2023/results.json',
               method: 'GET'
          }).then((result) => {
          //     dispatch(getDataApi(result.data))
              dispatch(getDataApi(result.data.MRData.RaceTable))
          })
     }, [])


     return (
          <div>
               <p className='text-red-800'>chsjkshdfjk</p>

               <Button type='primary' onClick={() => {
                    dispatch(countupNumber(1))
               }}>++</Button>
               <p>number: </p>
          </div>
     )
}