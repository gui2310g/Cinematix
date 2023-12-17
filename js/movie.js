import { api, img } from "./api.js";


const id = new URLSearchParams(window.location.search);
const movieid = id.get('id');

const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch(`https://api.themoviedb.org/3/movie/${movieid}?api_key=${api}`, options)
    .then(res => res.json())
    .then(data => {

        try {
            const movies = data

            const main = document.querySelector('#main')

            const article = document.createElement('article');

            /* div */
            const div1 = document.createElement('div');
            div1.className = 'div1'
            div1.style.backgroundImage = `url(${img}${movies.backdrop_path})`;

            /* div left */

            const div1left = document.createElement('div')
            div1left.className = 'div1-left'
            const movieimg = document.createElement('img');
            movieimg.src = `${img}${movies.poster_path}`;
            movieimg.alt = movies.original_title;

            div1left.appendChild(movieimg)
            div1.appendChild(div1left)

            /* div right */

            const div1right = document.createElement('div')
            div1right.className = 'div1-right';

            const title = document.createElement('h1');
            title.textContent = movies.original_title;

            const release = document.createElement('h2');
            release.textContent = `Release date: ${movies.release_date}`

            const genreNames = data.genres.map(genre => genre.name).join(', ');

            const productioncompanies = data.production_companies.map(production => production.name).join(', ');

            const duration = document.createElement('h2');
            duration.textContent = `Duration: ${movies.runtime} minutes`;

            const overview = document.createElement('p');
            overview.textContent = movies.overview;
            fetch(`https://api.themoviedb.org/3/movie/${movieid}/videos?api_key=${api}`, options)
            .then(res => res.json())
            .then(data => {
                try {
                    const trailers = data.results.filter(video => video.type === 'Trailer');
        
                    if (trailers) {
                        const trailer = trailers[0]; 
        
                        const movieVideo = document.createElement('iframe');
                        movieVideo.src = `https://www.youtube.com/embed/${trailer.key}`;
                       
                        movieVideo.allow = "autoplay; encrypted-media; gyroscope; picture-in-picture";
                        movieVideo.allowFullscreen = true;
        
                        
                        div1right.appendChild(movieVideo);
                        div1right.appendChild(title);
                        div1right.appendChild(overview);
                        div1right.appendChild(release); 
                        
                        if (genreNames) {
                            const moviegenre = document.createElement('h2');
                            moviegenre.textContent = `Genre(s): ${genreNames}`;
                            div1right.appendChild(moviegenre);
                        } else {
                            const moviegenre = document.createElement('h2');
                            moviegenre.textContent = `Genre(s) undefined`;
                            div1right.appendChild(moviegenre);
                        }

                        if(productioncompanies) {
                            const moviecompany = document.createElement('h2');
                            moviecompany.textContent = `Production Companies: ${productioncompanies}`;
                            div1right.appendChild(moviecompany)
                         } else {
                            const moviegenre = document.createElement('h2');
                            moviegenre.textContent = `Production Company undefined`;
                            div1right.appendChild(moviegenre);
                        }

                        div1right.appendChild(duration);
                        
                    } else {
                        console.error('Nenhum trailer disponível para este filme.');
                    }
                    
                } catch (error) {
                    console.error('Error fetching movies:', error);
                }
            });

            div1.appendChild(div1right)
            article.appendChild(div1);
            main.appendChild(article);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }

        
    })
