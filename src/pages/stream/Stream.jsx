import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import CommentList from '../../components/commentList/CommnentList'
import MovieList from '../../components/movieList/MovieList'
import UseWindowSize from '../../customHook/UseWindowSize'
import propType from 'prop-types'
import './Stream.scss'
import { FaBars, FaCaretDown } from 'react-icons/fa'
import tmdbAPI from '../../api/tmdbApi'


const Stream = () => {
    const { category, id } = useParams()
    const [movie, setMovie] = useState(null)
    const [params, setParams] = useState({
        season: 1,
        episode: 1
    })
    const iframeRef = useRef()
    const size = UseWindowSize()
    const link = category === 'movie' ? `https://2embed.org/embed/movie?tmdb=${id}` : `https://2embed.org/embed/series?tmdb=${id}&sea=${params.season}&epi=${params.episode}`

    useEffect(() => {
        iframeRef.current.setAttribute('height', iframeRef.current.offsetWidth * 9 / 16 + 'px')
    }, [size.width])

    useEffect(() => {
        const getTV = async () => {
            const response = await tmdbAPI.details(category, id, { params: {} })
            setMovie(response)
            console.log(response)
        }

        getTV()
    }, [category, id])

    return (
        <div className="stream container">
            <div className="stream_frame section">
                <iframe
                    ref={iframeRef}
                    src={link}
                    width="100%"
                    allowFullScreen="allowfullscreen"
                    frameBorder={0}
                    title='stream'></iframe>
            </div>

            {
                category === 'tv' && <TVChooser movie={movie} params={params} setParams={setParams} />
            }

            <div className="stream_comment section">
                <h2>Comments</h2>
                <CommentList />
            </div>

            <div className="stream_similar section">
                <h2>You may also like</h2>
                <MovieList movieCategory={category} id={id} type='similar' />
            </div>
        </div >
    )
}

const TVChooser = (props) => {
    const [episodes, setEpisodes] = useState([])
    const [isSeasonDropBox, setIsSeasonDropBox] = useState(false)

    useEffect(() => {
        const getEpisode = async () => {
            const response = await tmdbAPI.episode(props.movie.id, props.params.season)
            setEpisodes(response.episodes)
        }

        getEpisode()
    }, [props.params.season, props.movie])

    return (
        <div className="tv_chooser">
            <div className="tv_season">
                <div className="tv_season_main" onClick={() => setIsSeasonDropBox(!isSeasonDropBox)}>
                    <FaBars className='tv_season_first_icon' />
                    Season: {props.params.season}
                    <FaCaretDown className='tv_season_last_icon' />
                </div>

                {
                    isSeasonDropBox &&
                    <ul className="tv_chooser_season_list">
                        {
                            props.movie.seasons.map((season, index) => (
                                props.movie.seasons.length - 1 !== index &&
                                <li className='tv_chooser_season_item' key={index} onClick={() => { props.setParams({ ...props.params, season: index + 1 }); setIsSeasonDropBox(false) }}>Season {index + 1}</li>
                            ))
                        }
                    </ul>
                }
            </div>
            <div className="tv_episode">
                {
                    episodes.map((episode, index) => {
                        return (
                            <div key={index} className={`episode_item ${props.params.episode === (index + 1) && 'active'}`} onClick={() => props.setParams({ ...props.params, episode: index + 1 })}>
                                <div className="episode_name">
                                    <span className='episode_number'>Eps {episode.episode_number}: </span> {episode.name}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

TVChooser.propType = {
    movie: propType.object,
    params: propType.object,
    setParams: propType.func
}

export default Stream