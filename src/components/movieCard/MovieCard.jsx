import propType from 'prop-types'
import React, { useState } from 'react'
import { FaHeart, FaPlay } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import tmdbAPI, { movieCategory } from '../../api/tmdbApi'
import { addFavoList, deleteFavoList } from '../../app/userSlice'
import { auth } from "../../firebase/firebase-authentication"
import { Favourite } from "../../firebase/firestore"
import Button, { OutlineButton } from '../button/Button'
import Modal from '../modal/Modal'
import './MovieCard.scss'

const checkFavoriteList = (id, list) => {
    for (let i = 0; i < list.length; i++) {
        console.log(list[i].id, id)
        if (list[i].id === id) {
            return true
        }
    }
    return false
}


const MovieCard = (props) => {
    const [isModal, setIsModal] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const item = props.item
    const link = `/${movieCategory[props.movieCategory]}/${item.id}`
    const poster = tmdbAPI.w5Image(item.poster_path || item.backdrop_path)

    const favoriteList = useSelector(state => state.favorite)
    const isFavorite = checkFavoriteList(item.id, favoriteList)

    const handleClick = async (id) => {
        if (auth.currentUser !== null) {
            const list = await Favourite.postFavourite(auth.currentUser.email, id, props.movieCategory)

            if (list === true) {
                let newList = JSON.parse(localStorage.getItem("favo"))
                for (let i = 0; i < newList.length; i++) {

                    if (newList[i].id === id) {
                        newList.splice(i, 1)
                    }
                }
                if (newList.length !== 0) {
                    dispatch(deleteFavoList(newList))
                } else {
                    dispatch(deleteFavoList([]))
                }
            }
            else {
                const newFavo = {
                    id: id,
                    category: props.movieCategory
                }
                dispatch(addFavoList(newFavo))
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
                        <OutlineButton onClick={() => handleClick(item.id)} className={isFavorite ? 'movie_card_icon-broken' : 'movie_card_icon'}>
                            {isFavorite ? <FaHeart /> : <FaHeart />}
                        </OutlineButton>
                    </div>
                </div>
                <Link to={link}><h4>{item.title || item.name}</h4></Link>
            </div>

            {isModal && <Modal closeModal={setIsModal} />}
        </>
    )
}
MovieCard.propType = {
    changeFavo: propType.func
}

export default MovieCard