import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MovieGrid from '../../components/movieGrid/MovieGrid'
import tmdbAPI from '../../api/tmdbApi'
import { useSelector } from 'react-redux'
import './Favorite.scss'

const Favorite = () => {
    const params = useParams()
    const movieCategory = params.category
    const [favorite, setFavorite] = useState([])
    const favoriteList = useSelector(state => state.favorite)

    useEffect(() => {
        const getList = async () => {
            const temp = []

            for (let i = 0; i < favoriteList.length; i++) {
                const response = await tmdbAPI.details(favoriteList[i].category, favoriteList[i].id, { params: {} })
                temp.push(response)
            }

            setFavorite(temp)
        }
        getList()
    }, [favoriteList])

    return (
        <div className='category container section'>
            {
                <MovieGrid movieCategory={movieCategory} isFavorite={true} favoList={favorite} isEmptyFavo={favoriteList.length > 0} />
            }
        </div>
    )
}

export default Favorite