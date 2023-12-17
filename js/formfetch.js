import { api, img } from "./api.js";

const params = new URLSearchParams(window.location.search);
const searchquery = params.get('q');

const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch(`https://api.themoviedb.org/3/search/movie?query=${searchquery}&api_key=${api}`, options)
    .then(res => res.json())
    .then(data => {

    try {
        const movies = data.results
        const main = document.querySelector('#main');
        movies.forEach(movie => {
            const movielink = document.createElement('a');
            movielink.href = `Movie.html?id=${movie.id}`;  
            const movieimg = document.createElement('img');
            movieimg.src = `${img}${movie.poster_path}`;
            movieimg.alt = movie.original_title;

            movielink.appendChild(movieimg)
            main.appendChild(movielink);

        })
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
})