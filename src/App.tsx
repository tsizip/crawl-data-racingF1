import { useEffect, useState } from 'react'
import './index.css'
import CrawlMain from './components/CrawlMain'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getDataApiRaces } from './reducer/dataReducer'
import { Route, Routes, useParams } from 'react-router-dom'
import HomeTemplate from './template/HomeTemplate'
import Detail from './components/Detail'
import Loading from './components/Loading'
import { RootState } from './redux/store'
import { div } from 'three/examples/jsm/nodes/Nodes.js'



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
      
      <Routes>
        <Route path='/' element={<HomeTemplate />}>
          <Route path='/' element={<CrawlMain/>} />
          <Route path='detail/:year/:name' element={<Detail/>} />
        </Route>


      </Routes>
    
    </div>
  )
}

export default App
