// https://developers.themoviedb.org/3/movies/get-movie-videos -- get movie videos (get movie and TV id from response.json
// https://developers.themoviedb.org/3/tv/get-tv-videos -- Tv show videos (get tv show id from the response.json

const featuredMovieTitle = document.getElementById('featuredMovieTitle')
const featuredMovieBg = document.getElementById('featuredMovieBg')
const netflixOriginalShows = document.getElementById('netflixOriginalShows')
const trendingNow = document.getElementById('trendingNowMovies')
const topRated = document.getElementById('topRatedMovies')
const modal = document.getElementById("myModal")
const span = document.getElementsByClassName("close")[0] // Get the <span> element that closes the modal
const allMovies = document.getElementsByClassName('movie-identifier') 
const modalContent=document.getElementById('modalContent')
const modalText=document.getElementById('modalText')

//All URLs
const apiKeyV3 = 'dd4d3b66bfd5b093fcb316890e461252'
const getOriginalURL = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKeyV3}&with_networks=213`   //without trailer
const getTrendingURL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKeyV3}`
const getTopRatedURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKeyV3}&language=en-US&page=1`
const imgBaseURL = `https://image.tmdb.org/t/p/w500`
const popularMovieURL = `https://api.themoviedb.org/3/movie/popular?api_key=dd4d3b66bfd5b093fcb316890e461252&language=en-US&page=1`

window.onload = () => {
    getFeaturedMovie()
    getNetflixOriginals()
    getTrendingMovies()
    getTopRated()
}

//get featured movie card
async function getFeaturedMovie() {
    const data = await fetchData(popularMovieURL)
    featuredMovieBg.classList.add('featuredMovieBg', 'movie-identifier')
    featuredMovie(data)
}

//get all netflix original movies
async function getNetflixOriginals() {
    const data = await fetchData(getOriginalURL)
    displayMovieDetails(data, netflixOriginalShows)
}

//get all trending now movies
async function getTrendingMovies() {
    const data = await fetchData(getTrendingURL)
    displayMovieDetails(data, trendingNow)
}

//get all top rated movies here
async function getTopRated() {
    const data = await fetchData(getTopRatedURL)
    displayMovieDetails(data, topRated)
}

//show movie trailer when a particular movie is selected
const showMovieTrailers= async (id)=>{
    let trailerKey= await getTrailerKey(id)
    if(trailerKey!==false){
        let youtubeTrailerURL=`https://www.youtube.com/embed/${trailerKey}`
        modal.style.display = "block";
        modalFunctionality()
        modalContent.innerHTML=`
        <iframe
              src="${youtubeTrailerURL}"
              width="1000px"
              height="500px"
              src=""
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
        ></iframe>
    `
    }
    else{
        modal.style.display = "block";
        modalFunctionality()
        alert(`invalid API Request`)
        modalContent.innerHTML=
        `
        <div style='display:flex;flex-direction:column;align-items:center;color:black;'>
        <h1>THIS API SUCKS. THE TRAILER YOU REQUESTED STILL HASNT BEEN INDEXED BY THIS OLD-JANKY API.</h1>
        <h3>In case you want to use this project for your personal use and want me to shift to an API that is response 99% of the times contact me on Github @Nishkarsh1606 </h3>
        </div>
        `
    }
}

//show all netflix originals trailer
const showNetflixTrailers= async (id)=>{
    let trailerKey= await getNetflixTrailerKey(id)
    if(trailerKey!==false){
        let youtubeTrailerURL=`https://www.youtube.com/embed/${trailerKey}`
        modal.style.display = "block";
        modalFunctionality()
        modalContent.innerHTML=`
        <iframe
              src="${youtubeTrailerURL}"
              width="1000px"
              height="500px"
              src=""
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
        ></iframe>
    `
    }
    else{
        modal.style.display = "block";
        modalFunctionality()
        alert(`invalid API Request`)
        modalContent.innerHTML=
        `
        <div style='display:flex;flex-direction:column;align-items:center;color:black;'>
        <h1>THIS API SUCKS. THE TRAILER YOU REQUESTED STILL HASNT BEEN INDEXED BY THIS OLD-JANKY API.</h1>
        <h3>In case you want to use this project for your personal use and want me to shift to an API that is response 99% of the times contact me on Github @Nishkarsh1606 </h3>
        </div>
        `
    }
}


//function to display movie information
displayMovieDetails = (data, targetDOMElement) => {
    if (targetDOMElement === netflixOriginalShows) {
        for (let i = 0; i < data.results.length; ++i) {
            let moviePoster = `${imgBaseURL}${data.results[i].poster_path}`
            let movieID=data.results[i].id
            netflixOriginalShows.innerHTML += 
            `
            <div onclick=showNetflixTrailers(${movieID}) id=${movieID} class="movie-card sm:w-[10vw] space-x-2 movie-identifier" style="background:url(${moviePoster})"></div>
            `
        }
    }
    else {
        for (let i = 0; i < data.results.length; ++i) {
            let moviePoster = `${imgBaseURL}${data.results[i].backdrop_path}`
            let movieID=data.results[i].id
            targetDOMElement.innerHTML += `
            <div onclick=showMovieTrailers(${movieID}) id=${movieID} class='small-movie-card min-h-[100%] min-w-[15%] movie-identifier' style="background:url(${moviePoster});background-size: cover;background-repeat: no-repeat;background-position: center; object-fit:scale-down"></div>
            `
        }
    }
}

//fetching movie information from api
fetchData = async (url) => {
    const response = await fetch(`${url}`)
    const data = await response.json()
    return data
}

//modifying star/selected movie information
featuredMovie = (data) => {
    const randomPicker = Math.floor(Math.random() * 20)
    let selectedMovie = data.results[randomPicker]
    featuredMovieBg.style.background = `url(${imgBaseURL}${selectedMovie.backdrop_path})`
    featuredMovieTitle.textContent = selectedMovie.original_title
    document.getElementById('featuredMovieDesc').textContent = selectedMovie.overview.substring(0, 150) + `...`
}

const getTrailerKey= async (id)=>{
    const response=await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=dd4d3b66bfd5b093fcb316890e461252&language=en-US`)
    const data= await response.json()
    if(data.results.length>0){
        //if results array contains something means the API is working
        return(data.results[0].key)
    }
    else{
        return (false)
    }
}

const getNetflixTrailerKey= async (id)=>{
    const response=await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=dd4d3b66bfd5b093fcb316890e461252&language=en-US`)
    const data= await response.json()
    if(data.results.length>0){
        //if results array contains something means the API is working
        return(data.results[0].key)
    }
    else{
        return (false)
    }
}


function modalFunctionality(){
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    span.onclick = function () {
        modal.style.display = "none";
    }
}