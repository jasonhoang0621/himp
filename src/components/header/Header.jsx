import React, { useEffect, useRef, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logOut, toggleModal } from '../../app/userSlice'
import { auth, SignOut } from '../../firebase/firebase-authentication'
import { OutlineButton } from '../button/Button'
import LoggedInModal from '../loggedInModal/LoggedInModal'
import Modal from '../modal/Modal'
import UserList from '../userList/UserList'
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
    const [isLoggedInModal, setIsLoggedInModal] = useState(false)
    const [isUserListModal, setIsUserListModal] = useState(false)
    const [formStatus, setFormStatus] = useState(1)
    let role = localStorage.getItem("role")

    const isModal = useSelector(state => state.isModal)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const changeUser = (data) => {
        // setUserState(data)
        role = localStorage.getItem("role")
    }

    const handleSignOut = async () => {
        await SignOut();
        role = null
        localStorage.removeItem("role")
        localStorage.removeItem("favo")
        dispatch(logOut())
    }

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

                    {user != null ?
                        <div className="header_logged_in">
                            <FaUser className='header_logged_in_icon' />
                            <ul className="header_logged_in_list">
                                <li className="header_logged_in_item" onClick={() => { setFormStatus(1); setIsLoggedInModal(true) }}>Information</li>
                                <li className="header_logged_in_item" onClick={() => { setFormStatus(2); setIsLoggedInModal(true) }}>Password</li>
                                <li className="header_logged_in_item"><Link to='/favorite'>Favorite list</Link></li>
                                {role !== "false" &&
                                    <li className="header_logged_in_item" onClick={() => { setIsUserListModal(true) }}>User list</li>}
                                <li className="header_logged_in_item" onClick={handleSignOut}>Log out</li>
                            </ul>
                        </div>
                        :
                        <OutlineButton onClick={() => dispatch(toggleModal(true))} > Sign in</OutlineButton>}

                </div>
            </div>

            {isModal && <Modal changeUser={changeUser} />}
            {isLoggedInModal && <LoggedInModal closeModal={setIsLoggedInModal} form={formStatus} username={auth.currentUser.displayName} />}
            {isUserListModal && <UserList closeModal={setIsUserListModal} />}
        </div >
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