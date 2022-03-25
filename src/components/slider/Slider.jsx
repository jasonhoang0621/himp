import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SwiperCore, { Autoplay, EffectCoverflow, Pagination } from 'swiper';
//swiper style
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from 'swiper/react';
import tmdbApi, { movieType } from '../../api/tmdbApi';
// import "swiper/css/navigation";
import './Slider.scss';

import { FaStar } from 'react-icons/fa';


const Slider = () => {
    const [movieList, setMovieList] = useState([])

    SwiperCore.use([Autoplay])

    useEffect(() => {
        const getMovie = async () => {
            const params = { page: 1 }
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, { params })
                setMovieList(response.results.slice(0, 6))
                console.log(response)
            } catch (err) {
                console.log(err)
            }
        }

        getMovie()
    }, [])

    return (
        <div className="slider" style={{ marginTop: '8rem' }}>
            <Swiper
                effect={"coverflow"}
                centeredSlides={true}
                breakpoints={{
                    // when window width is >= 0px
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    },
                    // when window width is >= 1024px
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },


                }}
                autoplay={{
                    delay: 7000,
                    disableOnInteraction: false,
                }}
                pagination={true}
                loop={true}
                modules={[EffectCoverflow, Autoplay, Pagination]}
            >
                {
                    movieList.map((item, index) => (
                        <SwiperSlide key={index}>
                            {({ isActive }) => (
                                <SliderItem item={item} className={isActive ? 'active' : ''} />
                            )}
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div >
    )
}

const SliderItem = (props) => {
    const navigate = useNavigate()

    const item = props.item

    const backgroundImage = tmdbApi.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path)

    return (
        <div
            className={`slider_item ${props.className}`}
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >

            <div className="slider_item_warper container">
                <div className="slider_item_poster">
                    <img src={tmdbApi.w5Image(item.poster_path)} alt="" style={{ flexShrink: '0' }} />
                </div>

                <div className="slider_item_info">
                    <h2 className="title">{item.title}</h2>
                    <div className="rate">
                        <div className="vote">
                            {item.vote_average}
                            <span className='vote_icon'><FaStar /></span>
                        </div>
                        <div className="popularity">{item.popularity}</div>
                    </div>
                    <div className="overview">{item.overview}</div>
                    <button className="view_detail_button" onClick={() => navigate(`/movie/${item.id}`)}>
                        View detail
                    </button>
                    <button className="trailer_button" onClick={() => console.log('trailer')}>
                        Watch trailer
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Slider