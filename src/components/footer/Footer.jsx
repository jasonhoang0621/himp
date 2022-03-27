import React from 'react'
import { Link } from 'react-router-dom'

import './Footer.scss'

const Footer = () => {
    return (
        <div className="footer" style={{ backgroundImage: `url(./asset/image/footer.jpg)` }}>
            <div className="footer_warper section">
                <ul className="footer_col">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/about'>About us</Link></li>
                </ul>

                <ul className="footer_col">
                    <li><Link to='/movie'>You must watch</Link></li>
                    <li><Link to='/movie'>Recent release</Link></li>
                    <li><Link to='/movie'>Top rated</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Footer