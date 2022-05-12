import React, { useState, useEffect } from 'react'
import './Navbar.css'

function Navbar() {

    const [show, handleShow] = useState(false);

    useEffect(()=>{
        window.addEventListener("scroll", ()=>{
            if(window.scrollY>100) {
                handleShow(true);
            } else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll", ()=>{});
        };
    }, []);

  return (
    <div className={`navbar ${show && 'navbar_black'}`}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png" alt="Netflix Logo" className="navbar_logo" />
    </div>
  )
}

export default Navbar