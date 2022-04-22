import propType from 'prop-types'
import React, { useState } from 'react'
import { FaPlay, FaHeart, FaHeartBroken } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import tmdbAPI, { movieCategory } from '../../api/tmdbApi'
import Button, { OutlineButton } from '../button/Button'
import './MovieCard.scss'
import { auth } from "../../firebase/firebase-authentication"
import { Favourite } from "../../firebase/firestore"
import Notification from '../notifications/Notification'

const MovieCard = (props) => {
    const [isModal, setIsModal] = useState(false)
    const navigate = useNavigate()

    const item = props.item

    const link = `/${movieCategory[props.movieCategory]}/${item.id}`

    const poster = tmdbAPI.w5Image(item.poster_path || item.backdrop_path)
    const handleClick = async (id) => {
        if (auth.currentUser !== null) {
            const list = await Favourite.postFavourite(auth.currentUser.email, id, props.movieCategory)
            if (list === true) {
                const favoList = await Favourite.getFavourite(auth.currentUser.email)
                let list = []
                for (let i = 0; i < favoList.length; i++) {
                    const response = await tmdbAPI.details(favoList[i].category, favoList[i].id, { params: {} })
                    list.push(response)
                }
                props.changeFavo(list)
            }
            else {
                console.log("true")
            }
        } else {
            setIsModal(true)
        }
    }

    return (
        <>
            <div className='movie_card'>
                <div className="movie_card_background" style={{ backgroundImage: `url(${poster})` }}>
                    <div className="button_group">
                        <Button onClick={() => navigate(link)}>
                            <FaPlay className='movie_card_icon' />
                        </Button>

                        {/* only when signed up */}
                        <OutlineButton onClick={() => handleClick(item.id)} className={true ? 'movie_card_icon-broken' : 'movie_card_icon'}>
                            {true ? <FaHeartBroken /> : <FaHeart />}
                        </OutlineButton>
                    </div>
                </div>
                <Link to={link}><h4>{item.title || item.name}</h4></Link>
            </div>

            {isModal && <Notification closeModal={setIsModal} />}
        </>
    )
}
MovieCard.propType = {
    changeFavo: propType.func
}

export default MovieCard