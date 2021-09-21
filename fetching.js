const BASE_URL = 'https://my-json-server.typicode.com/moviedb-tech/movies/list';

const cardListEL = document.querySelector('.js-gallery');
const openModal = document.querySelector('.js-lightbox');
const btnCloseEl = document.querySelector('[data-action="close-lightbox"]');
const openImgEl = document.querySelector('.lightbox__image');
const overlayEl = document.querySelector('.lightbox__overlay');
const openTitleEl = document.querySelector('.title');
const openDesEl = document.querySelector('.description');
const openStarringEl = document.querySelector('.modalList');
const openDirectEl = document.querySelector('.director__name');
const openYearEl = document.querySelector('.year');
const openGenresEl = document.querySelector('.listGenres');
const favoriteList = document.querySelector('.listFav');

let arrFav = [];


const fetchMovies = async () => {
    return await fetch(BASE_URL).then(res => res.json());
}

const fetchMovie = async (id) => {
    return await fetch(`${BASE_URL}/${id}`).then(res => res.json());
}

const createListCards = ({img, year, name, id}) => {
    const liEL = document.createElement('li');
    liEL.classList.add('gallery__item');
    liEL.getAttribute('id');
    liEL.id = id
    
    const imgEl = document.createElement('img');
    imgEl.classList.add('gallery__image');
    imgEl.getAttribute('src');
    imgEl.src = img;
    imgEl.getAttribute('alt');
    imgEl.alt = name;

    const buttonEl = document.createElement('button');
    buttonEl.getAttribute('type');
    buttonEl.type = 'button';
    buttonEl.classList.add('favoriteBtn');


    const titleEl = document.createElement('h3');
    titleEl.classList.add('gallery__title');
    titleEl.textContent = name;
    
    const textEl = document.createElement('p');
    textEl.classList.add('gallery__text');
    textEl.textContent = year;


    liEL.append(imgEl, titleEl, textEl, buttonEl);

    return liEL;
};


fetchMovies().then(data => {
    data.forEach(el => {
        const elements = createListCards(el);
        cardListEL.append(elements);
    })

    const list = document.querySelectorAll('.gallery__item')
    list.forEach(el => {
        el.addEventListener('click', (e) => {

            if (e.target.nodeName === 'BUTTON') {
                addFavorite(e)
                return
            }
            const currentCard = e.currentTarget.id;
            console.log("🚀 ~ file: fetching.js ~ line 74 ~ el.addEventListener ~ currentCard", currentCard)

            fetchMovie(currentCard).then(data => modalCard(data))
            openModal.classList.toggle('is-open');
            
        })
    })
});

function modalCard(data) {
    console.log("🚀 ~ file: fetching.js ~ line 68 ~ modalCard ~ data", data)
    openImgEl.src = data.img;
    openImgEl.alt = data.name;
    openTitleEl.textContent = data.name;
    openDesEl.textContent = data.description;
    openDirectEl.textContent = data.director;
    openYearEl.textContent = data.year;
    
    const arrStarr = data.starring;
    arrStarr.map(el => {
        const elements = createListStarring(el)
        openStarringEl.append(elements);
    })
    const arrGenres = data.genres;
    arrGenres.map(el => {
        const elements = createListStarring(el)
        openGenresEl.append(elements);
    })

    
}

function createListStarring(data) {
    const liEL = document.createElement('li');
    liEL.classList.add('galleryModal__item');
    liEL.textContent = data;
    return liEL;
}
btnCloseEl.addEventListener('click', closedGalleryImg);

function closedGalleryImg() {
    openModal.classList.remove('is-open');
    clearModalEl()
};

function clearModalEl() {
    openImgEl.src = '';
    openImgEl.alt = '';
    openTitleEl.textContent = '';
    openDesEl.textContent = '';
    openDirectEl.textContent = '';
    openYearEl.textContent = '';

    const list = openStarringEl.childNodes;
    list.forEach(el => {
        el.textContent = '';
    })
     const list2= openGenresEl.childNodes;
    list2.forEach(el => {
        el.textContent = '';
    })
}

overlayEl.addEventListener('click', closedGalleryImg);

function onEscKeyPress(e) {
    if (e.key === 'Escape') {
        closedGalleryImg();
    }
};


function addFavorite(e) {
    const nameForFav = e.currentTarget.children[1].textContent;
    const notAdd = arrFav.includes(nameForFav);
    if(notAdd){
        return
    }
    arrFav.push(nameForFav)
    
    const currentBtn = e.target;
    currentBtn.classList.toggle('checked');
    console.log(arrFav);
    const element = createFavItem(nameForFav);
    favoriteList.insertAdjacentElement('beforeend', element);

    
    favoriteList.childNodes.forEach(el => {
       el.addEventListener('click', (e) => {
        if (e.target.nodeName !== 'BUTTON') return;
        currentBtn.classList.remove('checked');
        arrFav.splice(e.target.parentElement.children[0].textContent,1)
        const del = e.target.parentElement;
        del.remove();
    })
    })
        
    
}




function createFavItem(name) {
     const liEL = document.createElement('li');
    liEL.classList.add('listFav__item');
    const text = document.createElement('p');
    text.classList.add('listFav__text')
    text.textContent = name;

    const btnDel = document.createElement('button');
    btnDel.getAttribute('type');
    btnDel.type = 'button';
    btnDel.classList.add('delete');
    btnDel.textContent = 'Delete';
    liEL.append(text, btnDel)
    return liEL;
}

