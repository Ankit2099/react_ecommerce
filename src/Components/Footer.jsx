import React from 'react'
// import { Link } from 'react-router-dom'
import './footer.css'

export default function Footer() {
  return (
    <footer className='container-grid grid-two-column'>
        <div className='footer-section-1'>
            <div className='f1'>
                <a href="/home">Home</a>
            </div>
            <div className='f2'>
                <a href="/about">About</a>
            </div>

        </div>

        <div className='footer-section-2'>
            <div className='f3'>
                <a className='no-underline' href="#Mobile">Laptop</a>
            </div>
            <div className='f4'>
                
                <a href="#Mobile">Mobile</a>
            </div>

        </div>

    </footer>


  )
}


