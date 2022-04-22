import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MovieGrid from '../../components/movieGrid/MovieGrid'
import tmdbAPI from '../../api/tmdbApi'
import { useSelector } from 'react-redux'
import './Favorite.scss'

const Favorite = () => {
    const params = useParams()
    const movieCategory = params.category
    const [favorite,setFavorite] = useState([])
    const user = useSelector(state => state.user)
    const favoList =JSON.parse(localStorage.getItem("favo"))
    const favo = useSelector(state=>state.favorite)
    useEffect(()=>{
        const getList = async () =>{
            
            let favo_ = []
            if(!user)
                return
            for (let i =0;i < favoList.length;i++){
                const response = await tmdbAPI.details(favoList[i].category, favoList[i].id, { params: {} })
                favo_.push(response)
            }
            console.log(favo_)
            setFavorite(favo_)
        }
        getList()
    },[user,favo])

    return (
        <div className='category container section'>
            <MovieGrid movieCategory={movieCategory} isFavorite={true} favoList={favorite} />
        </div>
    )
}

export default Favorite