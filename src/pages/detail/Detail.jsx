import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import tmdbAPI from '../../api/tmdbApi'
import { addFavoList, deleteFavoList, toggleModal } from '../../app/userSlice'
import Button, { OutlineButton } from '../../components/button/Button'
import CommentList from '../../components/commentList/CommnentList'
import MovieList from '../../components/movieList/MovieList'
import { Favourite } from "../../firebase/firestore"
import CastList from './CastList'
import './Detail.scss'
import TrailerList from './TrailerList'

const checkFavoriteList = (id, list) => {
    for (let i = 0; i < list.length; i++) {
        console.log(id, list[i].id)
        if (list[i].id.toString() === id) {
            return true
        }
    }
    return false
}

const Detail = () => {
    const navigation = useNavigate()
    const { category, id } = useParams()
    const [movie, setMovie] = useState(null)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const favoriteList = useSelector(state => state.favorite)
    const isFavorite = checkFavoriteList(id, favoriteList)

    const handleClick = async () => {
        if (user !== null) {
            const list = await Favourite.postFavourite(user.user.email, parseInt(id), category)

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
                    category: category
                }
                dispatch(addFavoList(newFavo))
            }
        } else {
            dispatch(toggleModal(true))
        }
    }
    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbAPI.details(category, id, { params: {} })
            setMovie(response)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }

        getDetail()
    }, [category, id])

    return (
        <>
            {movie &&
                <div className="detail container">
                    <div className="detail_background" style={{ backgroundImage: `url(${tmdbAPI.originalImage(movie.backdrop_path || movie.poster_path)})` }}>
                    </div>
                    <div className="detail_content section">
                        <div className="detail_content_poster">
                            <img src={tmdbAPI.originalImage(movie.poster_path || movie.backdrop_path)} alt="" />
                        </div>

                        <div className="detail_content_info">
                            <div className="detail_btn">
                                <OutlineButton onClick={() => handleClick(id)} className={!isFavorite ? 'detail_btn_favorite' : 'detail_btn_favorite detail_btn_favorite-active'}>Favorite</OutlineButton>
                                <Button className='detail_btn_watch' onClick={() => navigation(`/stream/${category}/${movie.id}`)}>Watch</Button>
                            </div>

                            <div className="title">
                                <h1>{movie.title || movie.name}</h1>
                            </div>

                            <div className="general_info">
                                {movie.first_air_date && <div className="tv_info_item">{movie.number_of_seasons === 1 ? movie.number_of_seasons + ' Season' : movie.number_of_seasons + " Seasons"}</div>}
                                <div className="runtime">
                                    {category === 'movie' ? movie.runtime : movie.episode_run_time[0]} min
                                </div>
                                <div className="vote_average">
                                    {movie.vote_average}
                                    <span className="vote_average_icon"><FaStar /></span>
                                </div>
                            </div>

                            <div className="release_date">
                                Released: {movie.release_date || movie.first_air_date}
                            </div>

                            <div className="genres">
                                {
                                    movie.genres && movie.genres.slice(0, 7).map((genre, index) => (
                                        <span key={index} className='genres_item'>{genre.name}</span>
                                    ))
                                }
                            </div>

                            <div className="overview">{movie.overview}</div>
                        </div>
                    </div>

                    <div className="detail_cast section">
                        <div className="cast_header">
                            <h2>Casts</h2>
                        </div>
                        <div className="cast_content">
                            <CastList category={category} id={id} />
                        </div>
                    </div>

                    <div className="detail_trailer section">
                        <div className="cast_header">
                            <h2>Trailers</h2>
                        </div>
                        <TrailerList category={category} id={id} />
                    </div>

                    <div className="detail_comment section">
                        <h2>Comments</h2>
                        <CommentList movieCategory={category} id={movie.id.toString()} />
                    </div>

                    <div className="detail_similar section">
                        <h2>You may also like</h2>
                        <MovieList movieCategory={category} id={movie.id.toString()} type='similar' />
                    </div>
                </div>
            }
        </>
    )
}

export default Detail