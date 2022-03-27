import propType from 'prop-types';
import React, { useEffect, useState } from 'react';
//swiper style
import "swiper/css";
import { Swiper, SwiperSlide } from 'swiper/react';
import tmdbAPI, { movieCategory } from '../../api/tmdbApi';
import MovieCard from '../movieCard/MovieCard';
import './MovieList.scss';

const MovieList = (props) => {
    const [list, setList] = useState([])

    useEffect(() => {
        const getMovieList = async () => {
            let response = null
            const params = { page: 1 }

            if (props.type !== 'similar') {
                if (props.movieCategory === movieCategory.movie) response = await tmdbAPI.getMoviesList(props.movieType, { params })
                else response = await tmdbAPI.getTVList(props.movieType, { params })
            } else response = await tmdbAPI.similar(props.movieCategory, props.id)
            setList(response.results)
        }

        getMovieList();
    }, [props.movieCategory, props.movieType, props.id, props.type])

    return (
        <div className="movie_list">
            <Swiper
                breakpoints={{
                    // when window width is >= 0px
                    0: {
                        slidesPerView: 3,
                        spaceBetween: 10
                    },
                    // when window width is >= 1024px
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 20
                    },
                }}
                loop={true}
            >
                {
                    list.map((item, index) => {
                        return (
                            (item.poster_path || item.backdrop_path) && <SwiperSlide key={index}>
                                <MovieCard item={item} movieCategory={props.movieCategory} />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
    )
}

MovieList.propTypes = {
    id: propType.string,
    movieCategory: propType.string.isRequired,
    movieType: propType.string.isRequired
}

export default MovieList