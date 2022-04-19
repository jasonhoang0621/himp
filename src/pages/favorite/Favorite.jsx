import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MovieGrid from '../../components/movieGrid/MovieGrid'
import tmdbAPI from '../../api/tmdbApi'
import { Favourite } from '../../firebase/firestore'
import './Favorite.scss'

const Favorite = (props) => {
    const params = useParams()
    const movieCategory = params.category
    const [favorite,setFavorite] = useState([])
    useEffect(()=>{
        const getList = async () =>{
            let user = JSON.parse(localStorage.getItem("authUser"))
            if(!user)
                return
            const favoList = await Favourite.getFavourite(user.user.email)

            favoList.map(async item => {
                const response = await tmdbAPI.details(item.category, item.id, { params: {} })
                setFavorite(favorite => [...favorite, response])
            })
        }
        getList()
    },[])

    return (
        <div className='category container section'>
            <MovieGrid movieCategory={movieCategory} isFavorite={true} favoList={favorite} changeFavo={setFavorite}/>
        </div>
    )
}

export default Favorite