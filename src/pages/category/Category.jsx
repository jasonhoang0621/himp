import React from 'react'
import { useParams } from 'react-router-dom'
import MovieGrid from '../../components/MovieGrid/MovieGrid'
import './Category.scss'


const Category = () => {
    
    const params = useParams()
    const movieCategory = params.category

    return (
        <div className='category container section'>
            <MovieGrid movieCategory={movieCategory} />
        </div>
    )
}

export default Category