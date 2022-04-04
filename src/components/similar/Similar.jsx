import React from 'react'
import propType from 'prop-types'
import MovieList from '../movieList/MovieList'

const Similar = (props) => {
    return (
        <>
            <h2>Similar</h2>
            <MovieList type='similar' movieCategory={props.movieCategory} id={props.id.toString()} />
        </>
    )
}

Similar.propTypes = {
    movieCategory: propType.string.isRequired,
    id: propType.string.isRequired
}

export default Similar