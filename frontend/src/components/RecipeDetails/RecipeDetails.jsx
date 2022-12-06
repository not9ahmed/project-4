import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './RecipeDetails.css'

function RecipeDetails(props) {


    const id = useParams().id


    const [recipe, setRecipe] = useState({})



    useEffect(() => {
        axios.get(`http://localhost:4000/recipe/${id}`)
        .then(res => {
            console.log(res.data)
            setRecipe(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [id])

  return (
    <div className='recipe-details-page'>
        <h1>Recipe Details Page</h1>
        


        {recipe.images ?
        <img src={recipe.images[0]} />
        : <h1>Still loading..</h1>}


        <h1>{recipe.name_en}</h1>
        <h1>{recipe.name_ar}</h1>
        <h1>{recipe.description_en}</h1>
        <h1>{recipe.description_ar}</h1>


    </div>
  )
}

export default RecipeDetails