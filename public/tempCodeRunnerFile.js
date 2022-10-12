const featuredMovieTitle=document.getElementById('featuredMovieTitle')
// const featuredMovieBg=document.getElementById('featuredMovieBg')
// const netflixOriginalShows=document.getElementById('netflixOriginalShows')
// const trendingNow=document.getElementById('trendingNowMovies')
// const topRated=document.getElementById('topRatedMovies')

// //All URLs
// const apiKeyV3='dd4d3b66bfd5b093fcb316890e461252'
// const getOriginalURL=`https://api.themoviedb.org/3/discover/tv?api_key=${apiKeyV3}&with_networks=213`   //without trailer
// const getTrendingURL=`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKeyV3}`     
// const getTopRatedURL=`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKeyV3}&language=en-US&page=1`
// const imgBaseURL=`https://image.tmdb.org/t/p/w500`
// const popularMovieURL=`https://api.themoviedb.org/3/movie/popular?api_key=dd4d3b66bfd5b093fcb316890e461252&language=en-US&page=1`

// window.onload=()=>{
//     getFeaturedMovie()
//     getNetflixOriginals()
//     getTrendingMovies()
//     getTopRated()
// }

// //get featured movie card
// async function getFeaturedMovie(){
//     const data=await fetchData(popularMovieURL)
//     featuredMovieBg.classList.add('featuredMovieBg','movie-identifier')
//     selectedMovie(data)
// }

// //get all netflix original movies
// async function getNetflixOriginals(){
//     const data=await fetchData(getOriginalURL)
//     displayMovieDetails(data,netflixOriginalShows)
// }

// //get all trending now movies
// async function getTrendingMovies(){
//     const data=await fetchData(getTrendingURL)
//     displayMovieDetails(data,trendingNow)
// }

// //get all top rated movies here
// async function getTopRated(){
//     const data=await fetchData(getTopRatedURL)
//     displayMovieDetails(data,topRated)
// }

// //function to display movie information
// displayMovieDetails=(data,targetDOMElement)=>{
//     if(targetDOMElement===netflixOriginalShows){
//         for(let i=0;i<data.results.length;++i){
//             let moviePoster=`${imgBaseURL}${data.results[i].poster_path}`
//             netflixOriginalShows.innerHTML+=`
//             <div class="movie-card space-x-2 movie-identifier" style="background:url(${moviePoster})"></div>
//             `
//         }
//     }
//     else{
//         for(let i=0;i<data.results.length;++i){
//             let moviePoster=`${imgBaseURL}${data.results[i].backdrop_path}`
//             targetDOMElement.innerHTML+=`
//             <div class='small-movie-card min-h-[100%] min-w-[15%] movie-identifier' style="background:url(${moviePoster});background-size: cover;background-repeat: no-repeat;background-position: center; object-fit:scale-down"></div>
//             `
//         }
//     }
// }

// //fetching movie information from api
// fetchData= async(url)=>{
//     const response=await fetch(`${url}`)
//     const data=await response.json()
//     return data
// }

// //modifying star/selected movie information
// selectedMovie=(data)=>{
//     const randomPicker=Math.floor(Math.random()*20)
//     let selectedMovie=data.results[randomPicker]
//     featuredMovieBg.style.background=`url(${imgBaseURL}${selectedMovie.backdrop_path})`
//     featuredMovieTitle.textContent=selectedMovie.original_title
//     document.getElementById('featuredMovieDesc').textContent=selectedMovie.overview.substring(0,150)+`...`
// }