import { api, img } from './api.js'

const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${api}&region=US`, options)
  .then(res => res.json())
  .then(data => {

    try {
        const movies = data.results
        const movieContainer = document.querySelector('#upcoming');

        movies.forEach(movie => {
          const movielink = document.createElement('a');
          movielink.href = `pages/Movie.html?id=${movie.id}`;  
          const movieimg = document.createElement('img');
          movieimg.src = `${img}${movie.poster_path}`;
          movieimg.alt = movie.original_title;

          movielink.appendChild(movieimg)
          movieContainer.appendChild(movielink);
        })
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
  })