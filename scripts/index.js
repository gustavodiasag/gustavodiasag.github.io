const API_KEY = "api_key=29a1509406b955fb5abb6e441cee5fa7"
const BASE_URL = "https://api.themoviedb.org/3/"
const IMAGE_URL = "https://image.tmdb.org/t/p/w500"
const FINAL_URL = BASE_URL + 'discover/movie?sort_by=popularity.desc&' + API_KEY

const MAIN = document.getElementById('main')

window.onload = () => { getMovieResults(FINAL_URL) }

function getMovieResults(url) {
    fetch(url).then(response => response.json()).then(data => { showMovieResults(data.results) })
}

function showMovieResults(data) {
    MAIN.innerHTML = ''

    data.forEach(movie => {

        const CONTAINER = document.createElement('div')
        CONTAINER.classList.add('container')

        CONTAINER.innerHTML = `
        <div class="movie">
            <img src="${IMAGE_URL + movie.poster_path}" alt="Poster">
            <div class="title">
                <h4>${movie.title.toUpperCase()}</h4>
            </div>
            <div class="content">
                <p><strong>Release: </strong>${movie.release_date.split('-')[0]}</p>
                <p><strong>Votes: </strong>${movie.vote_count}</p>
                <p><strong>Popularity: </strong>${movie.popularity}</p>
            </div>
            <div class="under">
                <div class="hate">
                    <button class="details" onclick="movieDetails(${movie.id})">Details</button>
                    <p><strong>${movie.vote_average}</strong></p>
                </div>
            </div>
    </div>
        `
        MAIN.appendChild(CONTAINER)
    });

}

function searchMovies() {

    const MOVIE_NAME = document.getElementById('name').value

    url = BASE_URL + 'search/movie?' + API_KEY + '&query=' + MOVIE_NAME

    fetch(url).then(response => response.json()).then(data => {

        (data.results == "") ? alert('Invalid title!') : 0;
        showMovieResults(data.results)
    })
}

function movieDetails(id) { window.location.href = `./details.html?id=${id}` }





