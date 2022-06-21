const ID = window.location.search.split('=')[1];
const API_KEY = "api_key=29a1509406b955fb5abb6e441cee5fa7"
const BASE_URL = "https://api.themoviedb.org/3/"
const IMAGE_URL = "https://image.tmdb.org/t/p/w500"
const FINAL_URL = BASE_URL + 'movie/' + ID + '?' + API_KEY

const MAIN = document.getElementById('main')

window.onload = () => { getMovieResults(FINAL_URL) }

function getMovieResults(url) {
    fetch(url).then(res => res.json()).then(movie => {
        showDetails(movie)
    })
}

function showDetails(movie) {
    MAIN.innerHTML = ''
    const CONTAINER = document.createElement('div')
    CONTAINER.classList.add('container')

    console.log(movie)

    CONTAINER.innerHTML = `
    <div class="movie">
        <h1>${movie.title.toUpperCase()}</h1>
        <img src="${IMAGE_URL + movie.poster_path}" alt="Poster">
        
        <div class="info">
            <p><strong>Duration: </strong>${Math.floor(movie.runtime / 60)}h${movie.runtime % 60}min</p>
            <p><strong>Producer: </strong>${movie.production_companies[0].name}</p>
            <p><strong>Release date: </strong>${movie.release_date.replaceAll('-', '/')}</p>
            <p><strong>Genres: </strong>${getGenres(movie.genres)}</span>
            <p><strong>Languages: </strong>${getLanguages(movie.spoken_languages)}</span>
            <p><strong>Profit: </strong>$${(movie.revenue - movie.budget).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
            <p><strong>Description: </strong>${movie.overview}</p>
        </div>
    </div>
        `
    MAIN.appendChild(CONTAINER)
}

function getGenres(genres) {
    var list = []
    genres.forEach(element => { list.push(element.name) });
    return list.join(', ')
}

function getLanguages(languages) {
    var list = []
    languages.forEach(element => { list.push(element.english_name) });
    return list.join(', ')
}