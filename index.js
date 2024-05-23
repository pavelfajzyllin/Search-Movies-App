const inputNode = document.querySelector('.js-input_search_movie');
const btn_search = document.querySelector('.js-btn_search_movie');
const moviesSectionNode = document.querySelector('.js-movies_section');
const movieNode = document.querySelector('.js-movie');
const moviesList = document.querySelector('.js-movies')
const popupNode = document.querySelector('.js-popup');
const popupContentNode = document.querySelector('.js-popup_content');
const btnClosePopup = document.querySelector('.js-close-popup');


let API_URL = `https://www.omdbapi.com/?apikey=26657ba2&s=`
let API_selected_movie = `https://www.omdbapi.com/?apikey=26657ba2&i=`;
getID(API_selected_movie)


btn_search.addEventListener('click', function() {
    moviesList.innerHTML = '';
    API_URL_SEARCH = `${API_URL}${inputNode.value}`;
    getMovies(API_URL_SEARCH);
})

    
function showMovies (data) {
    moviesList.innerHTML = '';

    data.Search.forEach((movie) => {
        const thisMovie = document.createElement('div');
        thisMovie.classList.add('found_movie')
        thisMovie.innerHTML += `
                <div class="picture"><img class="img_movie" src='${movie.Poster}' alt=""></div>
                <div class="info_movie">
                    <h2 class="title_movie">${movie.Title}</h2>
                    <p class="year_movie">${movie.Year}</p>
                    <p class="type_movie">${movie.Type}</p>
                </div>

            `;

            thisMovie.addEventListener('click', () => openPopup(movie.imdbID));
            moviesList.appendChild(thisMovie);
                
    })


    }      


async function openPopup(id){
    const resp = await fetch(API_selected_movie + id)
    let respData = await resp.json();
    console.log(respData)
    popupNode.classList.add('popup_open');
    popupContentNode.innerHTML += `
    <button class="js-close-popup close-popup">Закрыть</button>
    <div class="row">
        <img class="poster_popup" src=${respData.Poster} alt="" srcset="">
        <div class="popup_col">
            <h2 class="title-popup">${respData.Title}</h2>
            <p class="item_popup">Год: ${respData.Year} </p>
            <p class="item_popup">Рейтинг: ${respData.Ratings} </p>
            <p class="item_popup">Дата выхода:${respData.Released}</p>
            <p class="item_popup">Продолжительность:${respData.Runtime} </p>
            <p class="item_popup">Жанр: ${respData.Genre}</p>
            <p class="item_popup">Режиссер: ${respData.Director}</p>
            <p class="item_popup">Сценарий:${respData.Writer} </p>
            <p class="item_popup">Актеры: ${respData.Actors}</p>
        </div>

    </div>
    <div class='annotation'>${respData.Plot}</div>
    `
    const btnClosePopup = document.querySelector('.js-close-popup');
    btnClosePopup.addEventListener('click', () => closePopup());
}

function closePopup() {
    popupContentNode.innerHTML = '';
    popupNode.classList.remove('popup_open');
}

async function getMovies(url) {
    const resp = await fetch(url);
    let respData = await resp.json();
    showMovies(respData);

    };

async function getID(url) {
    const resp = await fetch(url);
    let respData = await resp.json();
}

window.addEventListener('click', (e) => {
    if (e.target === popupNode){
        closePopup();
    }
})
