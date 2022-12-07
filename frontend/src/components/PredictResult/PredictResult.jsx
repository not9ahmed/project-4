import React from 'react'
import { useLocation } from 'react-router-dom'
import './PredictResult.css'

function PredictResult(props) {

  const location = useLocation()
  return (
    <div className='prediction-result-page'>
        <h1>Predict Result</h1>
        
        <p>

        {location.state.result}

        </p>
        
    </div>
  )
}

export default PredictResult