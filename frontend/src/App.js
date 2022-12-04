import logo from './logo.svg';
import './App.css';
import HomePage from './HomePage/HomePage'
import About from './About/About';
import Login from './User/Login';
import Signup from './User/Signup';
import Navbar from './Navbar/Navbar';
import Foods from './Foods/Foods';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 
import axios from 'axios';
import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';


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
    
    <Navbar onLogoutHandler={onLogoutHandler} isAuth={isAuth} user={user}/>
      <div className="App">
        <Routes>
          <Route path='/home' element={isAuth ? <HomePage /> : <Login login={loginHandler}></Login>} />
          <Route path='*' element={<HomePage />} />
          <Route path='/about' element={<About />} />
          <Route path='/Foods' element={<Foods />} />

          <Route path="/signup" element={<Signup register={registerHandler}></Signup>}></Route>
          <Route path="/login" element={<Login login={loginHandler}></Login>}></Route>
        </Routes>
      </div>
    </div>
  </Router>
  );
}

export default App;
