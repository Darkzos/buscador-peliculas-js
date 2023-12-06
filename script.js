
document.getElementById("searchButton").addEventListener('click', searchMovies)


let api_key ="cd50afb7aa8cfcbe9ea6c638eabc0268"
let urlBase = 'https://api.themoviedb.org/3/search/movie'
let urlImg = 'https://image.tmdb.org/t/p/w500'

let resultContainer = document.getElementById("results")

function searchMovies() {
    resultContainer.innerHTML = 'Cargando....'
    let searchInput = document.getElementById("searchInput").value
    fetch(`${urlBase}?api_key=${api_key}&query=${searchInput}`)
    .then(response => response.json())
    .then(response => displayMovies(response.results))

};

function displayMovies(movies){
    resultContainer.innerHTML = ''

    if(movies.length === 0) {
        resultContainer.innerHTML = "<p> There were no results for your search </p>"
        return
    }

    movies.forEach(movie => {
        let movieDiv = document.createElement('div')
        movieDiv.classList.add('movie')

        let title = document.createElement('h2')
        title.textContent = movie.title

        let releaseDate = document.createElement('p')
        releaseDate.textContent = "The release date was: " + movie.release_date
    
        let overview = document.createElement('p')
        overview.textContent = movie.overview

        let posterPath = urlImg + movie.poster_path
        let poster = document.createElement('img')
        poster.src= posterPath

        let voteAverage = document.createElement('p')
        voteAverage.textContent = "The average score for this movie is: " + movie.vote_average.toFixed(1)
        
        let score = movie.vote_average.toFixed(1)
        let stars = ''

        switch (true) {
            case score > 0 && score <= 2:
                stars = "*" 
                break;
            case score > 2 && score <= 4:
                stars = '**'
                break;
            case score > 4 && score <= 6:
                stars = '***'
                break;
            case score > 6 && score <= 8:
                stars = '****'
                break;
            case score > 8 && score <= 10:
                stars = '*****'
                break;
            default:
                break;
        };

        let scoreStars = document.createElement('p')
        scoreStars.textContent = "The average rating stars for this movie is: " + stars

        movieDiv.appendChild(poster)
        movieDiv.appendChild(title)
        movieDiv.appendChild(releaseDate)
        movieDiv.appendChild(overview)
        movieDiv.appendChild(voteAverage)
        movieDiv.appendChild(scoreStars)

        resultContainer.appendChild(movieDiv)
    });
};
