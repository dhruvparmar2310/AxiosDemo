import React from 'react'
import './App.css'
import AxiosDemo from './components/AxiosDemo'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App () {
  return (
    <>
      <div className='container'>
        <h2 className='App'>Car Details</h2><hr/>
        <AxiosDemo />
      </div>
    </>
  )
}

export default App
