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
const netflixOriginalShows=document.getElementById('netflixOriginalShows')
const trendingNow=document.getElementById('trendingNow')
const topRated=document.getElementById('trendingNow')

window.onload=()=>{
    getFeaturedMovie()
    getNetflixOriginals()
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

async function getNetflixOriginals(){
    const response=await fetch(`${getTrendingURL}`)
    const data=await response.json()
    for(let i=0;i<data.results.length;++i){
        let moviePoster=`${imgBaseURL}${data.results[i].poster_path}`
        netflixOriginalShows.innerHTML+=`
        <div class="movie-card" style="background:url(${moviePoster})"></div>
        `
        console.log(moviePoster)
    }
}
    // for(const movie of data.results){
    //     netflixOriginals.innerHTML=
    //     `
    //         <div class="movie-card h-[10rem] bg-[url(${imgBaseURL}${movie.poster_path})]">
    //         ${movie.title}
    //         </div>
    //     `
    // console.log(data.results[0])
    // }