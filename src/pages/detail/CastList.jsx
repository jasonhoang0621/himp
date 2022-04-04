import { useEffect, useState } from "react"
import propType from 'prop-types'
import tmdbAPI from "../../api/tmdbApi"

const CastList = (props) => {
    const [casts, setCasts] = useState([])

    useEffect(() => {
        const getCasts = async () => {
            const response = await tmdbAPI.credits(props.category, props.id)
            setCasts(response.cast.slice(0, 10))
        }

        getCasts()
    }, [props.category, props.id])

    return (
        <div className="cast_list">
            {
                casts.map((cast, index) => (
                    <div key={index} className="cast_item">
                        <div className="cast_item_img">
                            {cast.profile_path ?
                                <img src={tmdbAPI.originalImage(cast.profile_path)} alt="" />
                                :
                                <img src='https://media.wired.com/photos/5a0201b14834c514857a7ed7/master/pass/1217-WI-APHIST-01.jpg' alt="" />
                            }
                        </div>
                        <div className="cast_item_name">{cast.name}</div>
                    </div>
                ))
            }
        </div>
    )
}

CastList.propType = {
    category: propType.string.isRequired,
    id: propType.number.isRequired
}

export default CastList