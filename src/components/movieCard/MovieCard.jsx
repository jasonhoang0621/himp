import React from 'react'
import { FaPlay, FaHeart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import tmdbAPI, { movieCategory } from '../../api/tmdbApi'
import Button, { OutlineButton } from '../button/Button'
import './MovieCard.scss'

const MovieCard = (props) => {
    const navigate = useNavigate()

    const item = props.item

    const link = `/${movieCategory[props.movieCategory]}/${item.id}`

    const poster = tmdbAPI.w5Image(item.poster_path || item.backdrop_path)

    const nav = () => {
        navigate(link)
    }

    return (
        <>
            <div className="movie_card" style={{ backgroundImage: `url(${poster})` }}>
                <div className="button_group">
                    <Button onClick={nav}>
                        <FaPlay className='movie_card_icon' />
                    </Button>

                    {/* only when signed up */}
                    <OutlineButton>
                        <FaHeart className='movie_card_icon' />
                    </OutlineButton>
                </div>
            </div>
            <h4>{item.title || item.name}</h4>
        </>
    )
}

export default MovieCard