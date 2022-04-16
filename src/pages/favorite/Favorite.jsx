import React from 'react'
import { useParams } from 'react-router-dom'
import MovieGrid from '../../components/movieGrid/MovieGrid'

import './Favorite.scss'

const Favorite = () => {
    const params = useParams()
    const movieCategory = params.category
    console.log("Test "+movieCategory)

    return (
        <div className='category container section'>
            <MovieGrid movieCategory={movieCategory} isFavorite={true} />
        </div>
    )
}

export default Favorite