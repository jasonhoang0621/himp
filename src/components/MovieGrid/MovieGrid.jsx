import propType from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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

                setList(response.results)

            } else {
                const params = {
                    query: keyword
                }

                const temp = []
                response = await tmdbAPI.search(movieCategory.movie, params)
                temp.push(...response.results)
                response = await tmdbAPI.search(movieCategory.tv, params)
                temp.push(...response.results)
                setList(temp)
            }


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

            setList([...list, ...response.results])
        } else {
            const params = {
                page: page + 1,
                query: keyword
            }

            const temp = []
            response = await tmdbAPI.search(movieCategory.movie, params)
            temp.push(...response.results)
            response = await tmdbAPI.search(movieCategory.tv, params)
            temp.push(...response.results)

            setList([...list, ...temp])
        }

        setPage(page + 1)
    }

    return (
        <div className="movie_grid">
            <div className="movie_grid_header">
                <h1>{props.movieCategory === movieCategory.movie ? 'MOVIE' : props.movieCategory === movieCategory.tv ? 'TV SERIES' : 'RESULTS'}</h1>
            </div>

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



export default MovieGrid