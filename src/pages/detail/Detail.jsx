import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import tmdbAPI from '../../api/tmdbApi'
import CastList from './CastList'
import './Detail.scss'
import TrailerList from './TrailerList'


const Detail = () => {
    const { category, id } = useParams()
    const [movie, setMovie] = useState(null)

    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbAPI.details(category, id, { params: {} })
            setMovie(response)
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
                            <div className="title">
                                <h1>{movie.title || movie.name}</h1>
                            </div>
                            <div className="genres">
                                {
                                    movie.genres && movie.genres.slice(0, 7).map((genre, index) => (
                                        <span key={index} className='genres_item'>{genre.name}</span>
                                    ))
                                }
                            </div>
                            <div className="overview">{movie.overview}</div>
                            <div className="cast">
                                <div className="cast_header">
                                    <h2>Casts</h2>
                                </div>
                                <div className="cast_content">
                                    <CastList category={category} id={id} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="detail_trailer section">
                        <TrailerList category={category} id={id} />
                    </div>
                </div>
            }
        </>
    )
}

export default Detail