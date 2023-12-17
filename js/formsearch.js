document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const searchquery = params.get('q');

    if(searchquery) {
        displaySearchQuery(searchquery);
    }
}) 

function displaySearchQuery(query) {
    const main = document.querySelector('#title');
    main.textContent = ''; 

    const text = document.createElement('h1');
    text.textContent = `Results for: ${decodeURIComponent(query)}`;
    main.appendChild(text);

}
  