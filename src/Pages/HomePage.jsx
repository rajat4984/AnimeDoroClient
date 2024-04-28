import React from 'react'
import Timer from '../components/Timer'
import CurrentWatching from '../components/CurrentWatching'

const HomePage = () => {
  return (
    <div className='home-page'>
        <Timer/>
        <CurrentWatching/>
    </div>
  )
}

export default HomePage