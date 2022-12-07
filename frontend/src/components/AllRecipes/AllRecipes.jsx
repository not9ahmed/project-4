import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SingleRecipe from '../SingleRecipe/SingleRecipe'
import './AllRecipes.css'

function AllRecipes() {

    const [recipesList, setRecipesList] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/recipe')
        .then(res => {
            setRecipesList(res.data)
            // console.log(recipesList)
        })
        .catch(err => {
            console.log(err)
        })
    }, [recipesList])


  return (
    <>
        <div className="container">

            <div className='recipes-container'>
        
                {recipesList.map( (recipe, index) =>
                    <React.Fragment key={index}>
                    <SingleRecipe recipe={recipe} />
                    </React.Fragment>
                )}
                {recipesList.map( (recipe, index) =>
                    <React.Fragment key={index}>
                    <SingleRecipe recipe={recipe} />
                    </React.Fragment>
                )}
                {recipesList.map( (recipe, index) =>
                    <React.Fragment key={index}>
                    <SingleRecipe recipe={recipe} />
                    </React.Fragment>
                )}

            </div>

        </div>

    </>
  )
}

export default AllRecipes