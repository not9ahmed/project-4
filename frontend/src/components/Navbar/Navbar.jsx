import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

function Navbar() {
  return (

    <>


    <div>
      <ul className='navbar-ul'>
        
      <li><Link class ="Nav1" to='/home'>Home</Link></li>
      <li><Link class ="Nav2" to='/about'>About</Link></li>
      <li><Link class ="Nav3" to='/foods'>Foods</Link></li>
      <li><Link class ="Nav4" to='/Signup'>Signup</Link></li>
      <li><Link class ="Nav5" to='/Login'>Login</Link></li>
        {/* <li><Link to='/logout' onClick={props.onLogoutHandler}>Logout</Link></li> */}

      </ul>
    </div>
  
  </>




  )
}

export default Navbar