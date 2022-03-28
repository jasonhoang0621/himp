import propType from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import tmdbAPI, { movieCategory, movieType, tvType } from '../../api/tmdbApi'
import { OutlineButton } from '../button/Button'
import MovieCard from '../movieCard/MovieCard'
import './MovieGrid.scss'

const MovieGrid = (props) => {
    const [list, setList] = useState([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)

    const { keyword } = useParams()

    useEffect(() => {
        setPage(1)

        const getList = async () => {
            let response = null;

            if (keyword === undefined) {
                const params = {}
                if (props.movieCategory === movieCategory.movie) {
                    response = await tmdbAPI.getMoviesList(movieType.popular, params)
                } else response = await tmdbAPI.getTVList(tvType.popular, params)
            } else {
                const params = {
                    query: keyword
                }

                response = await tmdbAPI.search(props.movieCategory, params)
            }

            setList(response.results)
            setTotalPage(response.total_pages)
        }

        getList();
    }, [props.movieCategory, keyword])

    const loadMore = async () => {
        let response = null;

        if (keyword === undefined) {
            const params = {
                page: page + 1,
            }
            if (props.movieCategory === movieCategory.movie) {
                response = await tmdbAPI.getMoviesList(movieType.popular, params)
            } else response = await tmdbAPI.getTVList(tvType.popular, params)
        } else {
            const params = {
                page: page + 1,
                query: keyword
            }

            response = await tmdbAPI.search(props.movieCategory, params)
        }

        setList([...list, ...response.results])
        setPage(page + 1)
    }

    return (
        <div className="movie_grid">
            <div className="movie_grid_header">
                <h1>{props.movieCategory === movieCategory.movie ? 'MOVIE' : 'TV SERIES'}</h1>
            </div>

            <SearchBar movieCategory={props.movieCategory} />

            <div className="movie_grid_list">
                {
                    list.map((item, index) => (
                        <MovieCard movieCategory={props.movieCategory} item={item} key={index} />
                    ))
                }
            </div>
            {
                (page < totalPage) &&
                <div className="movid_grid_load_more">
                    <OutlineButton onClick={loadMore}>Load More</OutlineButton>
                </div>
            }
        </div>
    )
}

MovieGrid.propType = {
    movieCategory: propType.string
}

const SearchBar = (props) => {

    const [keyword, setKeyWord] = useState('')
    const navigate = useNavigate()

    const searchForMovie = (e) => {
        if (e.key === 'Enter' && keyword !== '') {
            navigate(`/${movieCategory[props.movieCategory]}/search/${keyword}`)
        }
    }

    return (
        <div className="movie_search">
            <input type="text" placeholder='Search' id="movie_search_bar" value={keyword} onKeyDown={searchForMovie} onChange={(e) => setKeyWord(e.target.value)} />
        </div>
    )
}

SearchBar.propType = {
    movieCategory: propType.string
}

export default MovieGrid