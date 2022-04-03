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
                            <img src={tmdbAPI.w5Image(cast.profile_path)} alt="" />
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