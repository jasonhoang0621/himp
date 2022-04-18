import propType from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import tmdbAPI, { movieCategory, movieType, tvType } from '../../api/tmdbApi'
import { Favourite } from '../../firebase/firestore'
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
            if (!props.isFavorite) {
                let response = null;

                if (keyword === undefined) {
                    const params = {}
                    if (props.movieCategory === movieCategory.movie) {
                        response = await tmdbAPI.getMoviesList(movieType.popular, params)
                    } else response = await tmdbAPI.getTVList(tvType.popular, params)

                    console.log(response.results)
                    setList(response.results)

                } else {
                    const params = {
                        query: keyword
                    }

                    const temp =[]
                    response = await tmdbAPI.search(movieCategory.movie, params)
                    temp.push(...response.results)
                    response = await tmdbAPI.search(movieCategory.tv, params)
                    temp.push(...response.results)
                    setList(temp)
                }
                setTotalPage(response.total_pages)
            } else {
                let user = JSON.parse(localStorage.getItem("authUser"))
                if(!user)
                    return
                const favoList = await Favourite.getFavourite(user.user.email)

                favoList.map(async item => {
                    const response = await tmdbAPI.details(item.category, item.id, { params: {} })
                    setList(list => [...list, response])
                })
            }
        }

        getList();
    }, [props.movieCategory, keyword, props.isFavorite])

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
                <h1>{props.movieCategory === movieCategory.movie ? 'MOVIE' : props.movieCategory === movieCategory.tv ? 'TV SERIES' : props.isFavorite ? 'FAVORITE' : 'RESULTS'}</h1>
            </div>

            <div className="movie_grid_list">
                {
                    list.map((item, index) => (
                        <MovieCard
                            movieCategory={props.movieCategory ? props.movieCategory :
                                item.first_air_date ? movieCategory.tv : movieCategory.movie}
                            item={item}
                            key={index} />
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
    movieCategory: propType.string,
    isFavorite: propType.bool,
}

export default MovieGrid