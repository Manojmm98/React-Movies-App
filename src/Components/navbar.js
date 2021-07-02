import React from 'react'
import './navbar.css'
// to link from one page to another page we import link from react router dom and use to={required path}
import { Link } from 'react-router-dom'
function navbar() {
    return (
        
            <nav className="nav-style">
             <Link to={'/movies'}>
            <h1>logo</h1>
            </Link>
            
              <ul className="list">
              <Link to={'/'}>
              <li>Home</li>
              </Link>
              <Link to={'/about'}>
              <li>About</li>
              </Link>
              <Link to={'/movies'}>
              <li>Movies</li>
              </Link>
              </ul>
              
         </nav>
    )
}

export default navbar
