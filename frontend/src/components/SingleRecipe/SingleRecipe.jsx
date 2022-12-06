import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './SingleRecipe.css'
import { useNavigate } from 'react-router-dom'

function SingleRecipe(props) {

    const recipe = props.recipe


    const recipeId = recipe._id


    const navigate = new useNavigate();

  
    const handleRecipeClick = (e) => {
        console.log('food id', recipeId)
        navigate(`/food/${recipeId}/details`);
    }


  return (
    <div className='recipe-card' onClick={handleRecipeClick} >



        <img className='recipe-img' src={recipe.images[0]}
                alt="Recipe"
               onError={(e) =>
                  (e.target.src="https://www.food4fuel.com/wp-content/uploads/woocommerce-placeholder-600x600.png")
          }/>
        <p className='recipe-card-title'>{recipe.name_en}</p>            
        <p className='recipe-card-desc'>{recipe.description_en}</p>
    </div>
  )
}

export default SingleRecipe