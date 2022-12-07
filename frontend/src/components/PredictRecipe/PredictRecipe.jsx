import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './PredictRecipe.css'

function PredictRecipe(props) {


    // call to the prediction route in express
    // have a form to upload image
    // the image will be sent to express
    // then express will send it to fast api and will get class response
    // that class/ recipe name will be queried from the database with all the details
    // the predict-recipe must be a new route on express 
    // that data will be sent to react
    // that class will be displayed on react 


    
    // axios
    // useEffect(()=> {
    //     axios.post()
    // })



    const [selectedImage, setSelectedImage] = useState('')

    // issue here
    // const [imagesFiles, setImagesFiles] = useState([])


    const [newRecipe, setNewRecipe] = useState({})



    const [image, setImage] = useState('')


    const changeHandler = (e) => {
        const recipe = { ...newRecipe };
        recipe[e.target.name] = e.target.value;
        setNewRecipe(newRecipe);
      }


    const imageHandler = (e) => {

        console.log(e.target.files[0])

        setImage(e.target.files[0])

        setSelectedImage(URL.createObjectURL(e.target.files[0]))
    }
    

    const removeImage = (e) => {

        setImage('')
        setSelectedImage('')
        console.log('selectedImage', selectedImage)

    }

      
      const navigate = useNavigate()

      const submitHandler = (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('image', image)

        axios.post('http://localhost:4000/predict-food', formData)
        .then(res => {
            console.log(res.data)

            const data = res.data

            navigate('/predict-result', {
                state: {
                    data: data
                }
            })

        })
        .catch(err => console.log(err))


        // navigate('/predict-result')

        // send to backend
        // function to handle submission or send the image state to backend
        // must add the user id
      }

  return (

    <div className='predict-recipe-page'>
        <h1>Predict Recipe Page</h1>
        

        <p>Please upload the recipe image that you want to predict</p>
        <p>Make sure that the image is clear without any noise</p>

        <div className='container'>


        <form id='predictForm' onSubmit={submitHandler}>


            
        <div className="mb-3">
                <input
                  type="file"
                  name="images"
                  onChange={imageHandler}
                  required
                  accept="image/png, image/jpeg, image/webp"
                />
        </div>
        <br />


        <div className="mb-3" id="formFile">
            
                {selectedImage ? 
                <>                    
                    <div key={`file-img`} className='file-img-div'>
                        <img src={selectedImage} className="file-img" alt="upload"/>
                    </div>
                    <div key={`file-btn`} className='file-delete-btn'>
                        <button value={selectedImage} onClick={removeImage}>
                        Delete
                        </button>
                    </div >
  
                </>

                : <h1>No Images uploaded</h1>}  

            </div>

        {/* <button type='submit' className='predictBtn'>Predict</button> */}

        <div className="col-12">
            <button className="btn btn-primary" type="submit">Predict Recipe</button>
        </div>

        </form>
        </div>
        
    </div>
  )
}

export default PredictRecipe