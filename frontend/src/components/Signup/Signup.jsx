import React, { useState } from 'react'
import './Signup.css'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Signup() {

    const navigate = useNavigate();
    const [newUser, setNewUser] = useState({});
    const [disabled, setDisabled] = useState(true);

    const changeHandler = (e) => {
        const user = { ...newUser };
        user[e.target.name] = e.target.value;
        setNewUser(user);
  
        if(!user.firstName || !user.lastName || !user.mobile || !user.email ||  !user.password  || !user.role){
          setDisabled(true)
        }else{
          setDisabled(false)
        } 
      }


      const regsiterHandler = (e) => {
        e.preventDefault();
        navigate('/login');
        // props.register(newUser) 
      }



  return (
    <div className='signup-page'>
        <h1>Signup Page</h1>

        <Container>


        
        <form id='signUpForm' onSubmit={regsiterHandler}>

            <div className="form-floating mb-3">
              <input type="text" name="username" onChange={changeHandler} className="form-control" id="floatingInput" placeholder="First Name" required/>
              <label htmlFor="floatingInput">Username</label>
            </div>
            <div className="form-floating mb-3">
              <input  type="email" name="email" onChange={changeHandler} className="form-control" id="floatingInput"  placeholder="Email Address" required/>
              <label htmlFor="floatingInput">Email Address</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" name="first_name" onChange={changeHandler} className="form-control" id="floatingInput" placeholder="First Name" required/>
              <label htmlFor="floatingInput">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" name="last_name" onChange={changeHandler} className="form-control" id="floatingInput"  placeholder="Last Name" required/>
              <label htmlFor="floatingInput">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input type="password" name="password" onChange={changeHandler} className="form-control" id="floatingPassword"  placeholder="Password" required/>
              <label htmlFor="floatingInput">Password</label>
            </div>

            <Button className="submit-button" disabled={disabled} type='submit'>Signup</Button>
        </form>
    
        </Container>
    </div>
  )
}

export default Signup