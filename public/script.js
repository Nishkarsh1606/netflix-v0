/*
https://api.themoviedb.org/3/discover/tv?api_key=dd4d3b66bfd5b093fcb316890e461252&with_networks=213 //netflix originals
https://api.themoviedb.org/3/trending/movie/week?api_key=dd4d3b66bfd5b093fcb316890e461252  //trending 
https://api.themoviedb.org/3/movie/top_rated?api_key=dd4d3b66bfd5b093fcb316890e461252&language=en-US&page=1 top rated
*/ 

const apiKeyV3='dd4d3b66bfd5b093fcb316890e461252'
const getOriginalURL=`https://api.themoviedb.org/3/discover/tv?api_key=${apiKeyV3}&with_networks=213`   //without trailer
const getTrendingURL=`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKeyV3}`     
const getTopRatedURL=`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKeyV3}&language=en-US&page=1`
const imgBaseURL=`https://image.tmdb.org/t/p/w500`


const featuredMovieTitle=document.getElementById('featuredMovieTitle')
const featuredMovieBg=document.getElementById('featuredMovieBg')
const netflixOriginalShows=document.getElementById('netflixOriginalShows')
const trendingNow=document.getElementById('trendingNowMovies')
const topRated=document.getElementById('topRatedMovies')

window.onload=()=>{
    getFeaturedMovie()
    getNetflixOriginals()
    getTrendingMovies()
    getTopRated()
}

//get featured movie card
async function getFeaturedMovie(){
    const randomPicker=Math.floor(Math.random()*20)
    const result=await fetch('https://api.themoviedb.org/3/movie/popular?api_key=dd4d3b66bfd5b093fcb316890e461252&language=en-US&page=1')
    const data=await result.json()
    let selectedMovie=data.results[randomPicker]
    featuredMovieBg.style.background=`url(${imgBaseURL}${selectedMovie.backdrop_path}) no-repeat`
    featuredMovieBg.style.backgroundPosition=`center/cover`
    featuredMovieBg.style.backgroundSize=`cover`
    featuredMovieTitle.textContent=selectedMovie.original_title
    document.getElementById('featuredMovieDesc').textContent=selectedMovie.overview.substring(0,150)+`...`
}

//get all netflix original movies
async function getNetflixOriginals(){
    const response=await fetch(`${getOriginalURL}`)
    const data=await response.json()
    for(let i=0;i<data.results.length;++i){
        let moviePoster=`${imgBaseURL}${data.results[i].poster_path}`
        netflixOriginalShows.innerHTML+=`
        <div class="movie-card" style="background:url(${moviePoster})"></div>
        `
        console.log(moviePoster)
    }
}

//get all trending now movies
async function getTrendingMovies(){
    const response=await fetch(`${getTrendingURL}`)
    const data=await response.json()
    for(let i=0;i<data.results.length;++i){
        let moviePoster=`${imgBaseURL}${data.results[i].backdrop_path}`
        trendingNow.innerHTML+=`
        <div class='small-movie-card min-h-[100%] min-w-[15%]' style="background:url(${moviePoster});background-size: cover;background-repeat: no-repeat;background-position: center; object-fit:scale-down"></div>
        `
    }
}

//get all top rated movies here
async function getTopRated(){
    const response=await fetch(`${getTopRatedURL}`)
    const data=await response.json()
    for(let i=0;i<data.results.length;++i){
        let moviePoster=`${imgBaseURL}${data.results[i].backdrop_path}`
        topRated.innerHTML+=`
        <div class='small-movie-card min-h-[100%] min-w-[15%]' style="background:url(${moviePoster});background-size: cover;background-repeat: no-repeat;background-position: center; object-fit:scale-down"></div>
        `
    }
}