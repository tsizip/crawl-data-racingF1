import { useState } from 'react'
import './index.css'
import CrawlMain from './components/CrawlMain'


function App() {

  return (
    <div className='container'>
      <h1 className="text-3xl font-bold underline text-center">
        2023 RACE RESULTS
      </h1>
      <CrawlMain />
    </div>
  )
}

export default App
