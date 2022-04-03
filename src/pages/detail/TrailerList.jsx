import propType from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import tmdbAPI from '../../api/tmdbApi'
import UseWindowSize from '../../customHook/UseWindowSize'


const TrailerList = (props) => {
    const [trailers, setTrailers] = useState([])

    useEffect(() => {
        const getTrailers = async () => {
            const response = await tmdbAPI.getVideo(props.category, props.id)
            setTrailers(response.results.slice(0, 2))
        }

        getTrailers()
    }, [props.category, props.id])

    return (
        <>
            {
                trailers.map((trailer, index) => (
                    <TrailerVideo key={index} trailer={trailer} />
                ))
            }
        </>
    )
}

const TrailerVideo = (props) => {
    const trailerRef = useRef(null)
    const size = UseWindowSize()

    useEffect(() => {
        trailerRef.current.setAttribute('height', trailerRef.current.offsetWidth * 9 / 16 + 'px')
    }, [size.width])

    return (
        <div className="trailer_item">
            <div className="title">
                <h2>{props.trailer.name}</h2>
            </div>
            <iframe
                src={`https://www.youtube.com/embed/${props.trailer.key}`}
                width='100%'
                frameBorder="0"
                title='trailer'
                ref={trailerRef}
            ></iframe>
        </div>
    )
}

TrailerList.propType = {
    category: propType.string.isRequired,
    id: propType.number.isRequired
}

TrailerVideo.propType = {
    trailer: propType.object.isRequired
}

export default TrailerList