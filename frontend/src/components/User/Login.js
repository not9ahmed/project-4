import React, {useState} from 'react'
import {Container, Form, Button} from "react-bootstrap";
import './Login.css';

export default function Login(props) {

    const [newUser, setNewUser] = useState({});

    const changeHandler = (e) => {
        const user = { ...newUser };
        user[e.target.name] = e.target.value;
        console.log(user);
        setNewUser(user);
    }

    const loginHandler = () => {
        props.login(newUser)
    }

  return (
    <div>
        <h1>Login</h1>

        <Container>
            <Form.Group>
                <Form.Label>username</Form.Label>
                <Form.Control name="username" onChange={changeHandler}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" onChange={changeHandler}></Form.Control>
            </Form.Group>

            <br></br>

            <Button variant="primary" onClick={loginHandler}>Login</Button>

        </Container>
        
    </div>
  )
}
