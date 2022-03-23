const apiConfig = {
    baseURL: 'https://www.themoviedb.org/3/',
    apiKey: 'd0dd285b7d33459e02545849c4bf9f22',
    originalImageURL: (imagePath) => `https://image.tmdb.org/t/p/original/${imagePath}`,
    w5Image: (imagePath) => `https://image.tmdb.org/t/p/w500/${imagePath}`,
}

export default apiConfig