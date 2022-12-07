import './App.css';
import HomePage from './components/HomePage/HomePage'
import About from './components/About/About';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Navbar from './components/Navbar/Navbar';
import AllRecipes from './components/AllRecipes/AllRecipes';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 
import axios from 'axios';
import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';
import PredictRecipe from './components/PredictRecipe/PredictRecipe';
import PredictResult from './components/PredictResult/PredictResult';


function App() {

    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState({});
  
    useEffect(() => {
      let token = localStorage.getItem("token");
  
      if(token != null){
        let user = jwt_decode(token);
  
        if(user){
          setIsAuth(true);
          setUser(user)
        }
        else if(!user){
          localStorage.removeItem("token");
          setIsAuth(false);
        }
      }
    }, [])
    
    const registerHandler = (user) => {
      axios.post("http://localhost:3000/users", user)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err)
      });
    }
  
    const loginHandler = (cred) => {
      axios.post("http://localhost:3000/auth/signin", cred)
      .then(res => {
      console.log(res.data.token)
  
        // Store the token in Local Storage.
        if(res.data.token != null){
          localStorage.setItem("token", res.data.token);
          let user = jwt_decode(res.data.token);
          setIsAuth(true);
          console.log('login handler', user)
          setUser(user);
          debugger
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
  
    const onLogoutHandler = (e) => {
      e.preventDefault();
      localStorage.removeItem("token");
      setIsAuth(false);
      setUser(null);
    }
  return (
  <Router>

    
      <div className="App">
      <Navbar onLogoutHandler={onLogoutHandler} isAuth={isAuth} user={user}></Navbar>

        <Routes>
          <Route path='/home' element={isAuth ? <HomePage /> : <Login login={loginHandler}></Login>} />
          <Route path='*' element={<HomePage />} />
          <Route path='/about' element={<About />} />
          <Route path='/recipes' element={<AllRecipes />} />

          <Route path="/signup" element={<Signup register={registerHandler}></Signup>}></Route>
          <Route path="/login" element={<Login login={loginHandler}></Login>}></Route>


          <Route path="/recipes/:id/details" element={<RecipeDetails/>} />

          <Route path="/predict-recipe" element={<PredictRecipe/>} />
          <Route path="/predict-result" element={<PredictResult/>} />
        </Routes>
      </div>

  </Router>
  );
}

export default App;
