import axiosClient from "./axiosClient"

export const movieCategory = {
    movie: 'movie',
    tv: 'tv',
}

export const movieType = {
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated',
}

export const tvType = {
    on_the_air: 'on_the_air',
    popular: 'popular',
    top_rated: 'top_rated',
}

const tmdbAPI = {
    originalImage: (imagePath) => `https://image.tmdb.org/t/p/original${imagePath}`,
    w5Image: (imagePath) => `https://image.tmdb.org/t/p/w500/${imagePath}`,
    getMoviesList: (type, params) => {
        const url = 'movie/' + movieType[type]
        return axiosClient.get(url, { params })
    },
    getTVList: (type, params) => {
        const url = 'tv/' + tvType[type]
        return axiosClient.get(url, { params })
    },
    getVideo: (category, id) => {
        const url = `${movieCategory[category]}/${id}/videos`
        return axiosClient.get(url, { params: {} })
    },
    search: (category, params) => {
        const url = `search/${movieCategory[category]}`
        return axiosClient.get(url, { params })
    },
    details: (category, id, params) => {
        const url = `${movieCategory[category]}/${id}`
        return axiosClient.get(url, params)
    },
    credits: (category, id) => {
        const url = `${movieCategory[category]}/${id}/credits`
        return axiosClient.get(url, { params: {} })
    },
    similar: (category, id) => {
        const url = `${movieCategory[category]}/${id}/similar`
        return axiosClient.get(url, { params: {} })
    },
}

export default tmdbAPI;

