const BASE_URL = 'https://my-json-server.typicode.com/moviedb-tech/movies/list';

export const fetchingMovies =  ()=> {
    return  fetch(BASE_URL).then(res => res.json()).catch(e => console.log(e));
}

