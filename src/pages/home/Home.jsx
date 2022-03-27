import React from 'react'
import { Link } from 'react-router-dom'
import { movieCategory, movieType, tvType } from '../../api/tmdbApi'
import { OutlineButton } from '../../components/button/Button'
import MovieList from '../../components/movieList/MovieList'
import Slider from '../../components/slider/Slider'
import './Home.scss'


const Home = () => {
    return (
        <>
            <Slider />
            <div className="home_suggest_list container">
                <div className="section mt-3">
                    <div className="section_header">
                        <h2>Upcoming movies</h2>
                        <Link to='/movie'>
                            <OutlineButton>View more</OutlineButton>
                        </Link>
                    </div>
                    <div className="">
                        <MovieList movieCategory={movieCategory.movie} movieType={movieType.upcoming} />
                    </div>
                </div>

                <div className="section mt-3">
                    <div className="section_header">
                        <h2>Trending movies</h2>
                        <Link to='/movie'>
                            <OutlineButton>View more</OutlineButton>
                        </Link>
                    </div>
                    <div className="">
                        <MovieList movieCategory={movieCategory.movie} movieType={movieType.popular} />
                    </div>
                </div>

                <div className="section mt-3">
                    <div className="section_header">
                        <h2>Top rated movies</h2>
                        <Link to='/movie'>
                            <OutlineButton>View more</OutlineButton>
                        </Link>
                    </div>
                    <div className="">
                        <MovieList movieCategory={movieCategory.movie} movieType={movieType.top_rated} />
                    </div>
                </div>


                <div className="section mt-3">
                    <div className="section_header">
                        <h2>Trending TV series</h2>
                        <Link to='/tv'>
                            <OutlineButton>View more</OutlineButton>
                        </Link>
                    </div>
                    <div className="">
                        <MovieList movieCategory={movieCategory.tv} movieType={tvType.popular} />
                    </div>
                </div>

                <div className="section mt-3">
                    <div className="section_header">
                        <h2>Top rated TV series</h2>
                        <Link to='/tv'>
                            <OutlineButton>View more</OutlineButton>
                        </Link>
                    </div>
                    <div className="">
                        <MovieList movieCategory={movieCategory.tv} movieType={tvType.top_rated} />
                    </div>
                </div>

                <div className="section mt-3">
                    <div className="section_header">
                        <h2>On the air TV series</h2>
                        <Link to='/tv'>
                            <OutlineButton>View more</OutlineButton>
                        </Link>
                    </div>
                    <div className="">
                        <MovieList movieCategory={movieCategory.tv} movieType={tvType.on_the_air} />
                    </div>
                </div>
            </div>
        </>

    )
}

export default Home