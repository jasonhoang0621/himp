import axios from "axios"
import queryString from "query-string"

const apiConfig = {
    baseURL: 'https://api.themoviedb.org/3/',
    apiKey: 'd0dd285b7d33459e02545849c4bf9f22',
}

axios.defaults.headers.post["Content-Type"] = "application/json";

const axiosTMDB = axios.create({
    baseURL: apiConfig.baseURL,
    paramsSerializer: params => queryString.stringify({ ...params, api_key: apiConfig.apiKey })
})

axiosTMDB.interceptors.request.use(async (config) => config)
axiosTMDB.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data
    }

    return response
}, (error) => {
    throw (error)
})


const axiosEmbed = axios.create({
    baseURL: 'https://www.2embed.ru/embed/tmdb/',
    paramsSerializer: params => queryString.stringify({ ...params })
})

axiosEmbed.interceptors.request.use(async (config) => config)
axiosEmbed.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data
    }

    return response
}, (error) => {
    throw (error)
})


export {
    axiosTMDB,
    axiosEmbed,
}
