
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { OutlineButton } from '../button/Button'
import Modal from '../Modal/Modal'
import './Header.scss'

const headerNavItem = [
    {
        display: 'Home',
        path: '/'
    },
    {
        display: 'Movie',
        path: '/movie'
    }, {
        display: 'TV Series',
        path: '/tv'
    },
]

const Header = () => {
    const { pathname } = useLocation()
    const headerRef = useRef()
    const [isModal, setIsModal] = useState(false)

    const active = headerNavItem.findIndex(item => item.path === pathname)

    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
                headerRef.current.classList.add('shrink')
            } else {
                headerRef.current.classList.remove('shrink')
            }
        }

        window.addEventListener('scroll', shrinkHeader)
        return () => {
            window.removeEventListener('scroll', shrinkHeader)
        }
    })

    return (
        <div ref={headerRef} className="header">

            <div className="header_wrap container section">
                <Link to='/' className="header_logo">HIMP</Link>

                <ul className="header_list">
                    {
                        headerNavItem.map((item, index) => (
                            <li key={index} className={`header_item ${active === index ? 'active' : ''}`}>
                                <Link to={item.path}>{item.display}</Link>
                            </li>))
                    }
                </ul>

                <div className="header_login">

                    <SearchBar />
                    <OutlineButton onClick={() => setIsModal(true)}>Sign in</OutlineButton>

                </div>
            </div>
            {isModal && <Modal closeModal={setIsModal} />}
        </div>
    )
}

const SearchBar = (props) => {

    const [keyword, setKeyWord] = useState('')
    const navigate = useNavigate()

    const searchForMovie = (e) => {
        if (e.key === 'Enter' && keyword !== '') {
            navigate(`/search/${keyword}`)
        }
    }

    return (
        <div className="movie_search">
            <input type="text" placeholder='Search' id="movie_search_bar" value={keyword} onKeyDown={searchForMovie} onChange={(e) => setKeyWord(e.target.value)} />
        </div>
    )
}

export default Header