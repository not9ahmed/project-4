import React from 'react'
import { useLocation } from 'react-router-dom'
import './PredictResult.css'

function PredictResult(props) {

  const location = useLocation()

  const recipe = location.state.data

  console.log(location.state.data)

  return (
    <div className='prediction-result-page'>
        <h1>Predict Recipe Result</h1>
        
      
        <p>The predict recipe is {recipe.name_en}</p>

        {recipe.images ?
        <img className='predict-recipe-image' src={recipe.images[0]} alt="Recipe"/>
        : <h1>Still loading..</h1>}

        <p>{recipe.name_en}</p>
        <p>{recipe.name_ar}</p>
        <p>{recipe.description_en}</p>
        <p>{recipe.description_ar}</p>


        
        {/* <p>{recipe.name_en}</p>  */}
        
    </div>
  )
}

export default PredictResult