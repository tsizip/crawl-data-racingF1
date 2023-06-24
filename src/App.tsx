import { useEffect, useState } from 'react'
import './index.css'
import CrawlMain from './components/CrawlMain'
import  Axios  from 'axios'
import { useDispatch } from 'react-redux'
import { getDataApiRaces } from './reducer/dataReducer'


function App() {

  const dispatch = useDispatch();

//   useEffect(()=>{
//     Axios({
//       url: `https://ergast.com/api/f1/2023/results/1.json`,
//       method: 'GET'
//  }).then((result) => {
//       //     dispatch(getDataApi(result.data))   
//       dispatch(getDataApiRaces([result.data.MRData.RaceTable.Races, 'RACES']))
      
//  })
//   },[])

  return (
    <div className=''>
      <CrawlMain />
    </div>
  )
}

export default App
