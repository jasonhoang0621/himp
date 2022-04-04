import { axiosEmbed } from "./axiosClient"

const EmbedAPI = {
    movieStreaming: (params) => {
        const url = `movie`
        return axiosEmbed.get(url, { params })
    },
    tvStreaming: (params) => {
        const url = `tv`
        return axiosEmbed.get(url, { params })
    }
}

export default EmbedAPI