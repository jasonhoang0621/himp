import React from 'react'
import MovieGrid from '../../components/movieGrid/MovieGrid'

import './Favorite.scss'

const Favorite = () => {
    return (
        <div className='container section'>
            <MovieGrid isFavorite={true} />
        </div>
    )
}

export default Favorite