import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import tmdbAPI from '../../api/tmdbApi'
import Button, { OutlineButton } from '../../components/button/Button'
import CommentList from '../../components/commentList/CommnentList'
import CastList from './CastList'
import './Detail.scss'
import TrailerList from './TrailerList'
import { FaStar } from 'react-icons/fa'
import Similar from '../../components/similar/Similar'

const Detail = () => {
    const navigation = useNavigate()
    const { category, id } = useParams()
    const [movie, setMovie] = useState(null)

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
                                <OutlineButton>Favorite</OutlineButton>
                                <Button className='detail_btn_watch' onClick={() => navigation(`/stream/${category}/${movie.id}`)}>Watch</Button>
                            </div>

                            <div className="title">
                                <h1>{movie.title || movie.name}</h1>
                            </div>

                            <div className="general_info">
                                <div className="runtime">
                                    {movie.runtime} min
                                </div>
                                <div className="vote_average">
                                    {movie.vote_average}
                                    <span className="vote_average_icon"><FaStar /></span>
                                </div>
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
                            <h2>Trailer</h2>
                        </div>
                        <TrailerList category={category} id={id} />
                    </div>

                    <div className="detail_comment section">
                        <h2>Comment</h2>
                        <CommentList movieCategory={category} id={movie.id.toString()} />
                    </div>

                    <div className="detail_similar section">
                        <Similar movieCategory={category} id={movie.id.toString()} />
                    </div>
                </div>
            }
        </>
    )
}

export default Detail