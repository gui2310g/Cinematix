document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const search = document.querySelector('input[type="text"]').value.trim()

    if (search != `pages/Search.html?q=${encodeURIComponent(search)}`) {
        window.location.href = `pages/Search.html?q=${encodeURIComponent(search)}`;
    } else {
        window.location.href = `Search.html?q=${encodeURIComponent(search)}`;
    }
})