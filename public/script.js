/*
1. Cover image for the featured movie
2. Functions to derive all movies types
3. Loop and display the array with url
https://api.themoviedb.org/3/discover/tv?api_key=dd4d3b66bfd5b093fcb316890e461252&with_networks=213
https://api.themoviedb.org/3/trending/movie/week?api_key=dd4d3b66bfd5b093fcb316890e461252
https://api.themoviedb.org/3/movie/top_rated?api_key=dd4d3b66bfd5b093fcb316890e461252&language=en-US&page=1
https://image.tmdb.org/t/p/w500/${imageURL} -->backdrop
https://image.tmdb.org/t/p/w500/tVxDe01Zy3kZqaZRNiXFGDICdZk.jpg 
*/

const apiKeyV3='dd4d3b66bfd5b093fcb316890e461252'
const getOriginalURL=`https://api.themoviedb.org/3/discover/tv?api_key=${apiKeyV3}&with_networks=213`   //without trailer
const getTrendingURL=`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKeyV3}`     
const getTopRatedURL=`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKeyV3}&language=en-US&page=1`
const imgBaseURL=`https://image.tmdb.org/t/p/w500`


const featuredMovieTitle=document.getElementById('featuredMovieTitle')
const featuredMovieBg=document.getElementById('featuredMovieBg')
const netflixOriginals=document.getElementById('netflixOriginals')
const trendingNow=document.getElementById('trendingNow')
const topRated=document.getElementById('trendingNow')

window.onload=()=>{
    getFeaturedMovie()
}

async function getFeaturedMovie(){
    const randomPicker=Math.floor(Math.random()*20)
    const result=await fetch('https://api.themoviedb.org/3/movie/popular?api_key=dd4d3b66bfd5b093fcb316890e461252&language=en-US&page=1')
    const data=await result.json()
    let selectedMovie=data.results[randomPicker]
    featuredMovieBg.style.background=`url(${imgBaseURL}${selectedMovie.backdrop_path}) no-repeat fixed center center/cover`
    featuredMovieTitle.textContent=selectedMovie.original_title
    document.getElementById('featuredMovieDesc').textContent=selectedMovie.overview.substring(0,150)+`...`
}