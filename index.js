const BASE_URL = 'https://my-json-server.typicode.com/moviedb-tech/movies/list';

const cardListEL = document.getElementById("cardList");

// Fetch All Movies
const fetchingMovies = async() => {
    return await fetch(BASE_URL).then(res => res.json()).catch(e => console.log(e))
};

fetchingMovies().then(data => {
    data.forEach(el => {
        const elements = makeGalleryCard(el);
        cardListEL.append(elements);
    })
});


// Create card 
const makeGalleryCard = ({name,img,year}) => {
    const liEL = document.createElement('li');
    liEL.classList.add('gallery__item');

    const linkEl = document.createElement('a');
    linkEl.classList.add('gallery__link');
    // linkEl.getAttribute('href');
    // // linkEl.href = original;
    const svgEl = document.createElement('svg');
    svgEl.classList.add('gallery__svg');
    svgEl.style.width = '10px';
    svgEl.style.height = '10px';
    const useEl = document.createElement('use');
    

    const imgEl = document.createElement('img');
    imgEl.classList.add('gallery__image');
    imgEl.getAttribute('src');
    imgEl.src = img;
    imgEl.getAttribute('alt');
    imgEl.alt = name;

    const titleEl = document.createElement('h3');
    titleEl.classList.add('gallery__title');
    titleEl.textContent = name;
    
    const textEl = document.createElement('p');
    textEl.classList.add('gallery__text');
    textEl.textContent = year;

    svgEl.append(useEl);
    linkEl.append(svgEl, imgEl, titleEl, textEl);
    liEL.append(linkEl);

    return liEL;
}



// const listGenresEl = document.createElement('ul');
//     listGenresEl.classList.add('genresList');

//     const itemGenresEl = document.createElement('li');
//     itemGenresEl.classList.add('genresItem');