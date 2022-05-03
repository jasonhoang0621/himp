import React from 'react'
import { Link } from 'react-router-dom'

import './Footer.scss'

const Footer = () => {
    return (
        <div className="footer" style={{ backgroundImage: `url(./asset/image/footer.jpg)` }}>
            <div className="footer_wrapper section">
                <ul className="footer_col">
                    <li>Copyright:</li>
                    <li>Hoàng Thiện Nhân - 19127489 </li>
                    <li>Lê Thành Khôi - 19127186 </li>
                </ul>

                <ul className="footer_col">
                    <li><Link to='/'>Home</Link></li>
                </ul>

                <ul className="footer_col">
                    <li><Link to='/movie'>Movie you must watch</Link></li>
                    <li><Link to='/tv'>TV series you may missed</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Footer