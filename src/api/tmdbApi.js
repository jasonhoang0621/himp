import axiosClient from "./axiosClient"

export const movieCategory = {
    movie: 'movie',
    tv: 'tv',
}

export const movieType = {
    upcoming: 'upcoming',
    popular: 'popular',
    topRated: 'topRated',
}

export const tvType = {
    upcoming: 'upcoming',
    popular: 'popular',
    onTheAir: 'on_the_air',
}

class tmdbAPI {
    getMoviesList = (type, params) => {
        const url = 'movie/' + movieType[type]
        return axiosClient.get(url, { params })
    }

    getTVList = (type, params) => {
        const url = 'tv/' + tvType[type]
        return axiosClient.get(url, { params })
    }

    getVideo = (category, id) => {
        const url = `${movieCategory[category]}/${id}/videos`
        return axiosClient.get(url, { params: {} })
    }

    search = (category, params) => {
        const url = `search/${movieCategory[category]}`
        return axiosClient.get(url, { params })
    }

    details = (category, id, params) => {
        const url = `${movieCategory[category]}/${id}`
        return axiosClient.get(url, params)
    }

    credits = (category, id) => {
        const url = `${movieCategory[category]}/${id}/credits`
        return axiosClient.get(url, { params: {} })
    }

    similar = (category, id) => {
        const url = `${movieCategory[category]}/${id}/similar`
        return axiosClient.get(url, { params: {} })
    }
}

