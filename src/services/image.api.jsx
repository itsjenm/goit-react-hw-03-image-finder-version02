export default function fetchImages(query, page) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '?key=33708705-fcc5c6414e4f1d5b337962d91';
    const searchParams = 'image_type=photo&orientation=horizontal&per_page=12';

    return fetch(
        `${BASE_URL}${API_KEY}&q=${query}&page=${page}&${searchParams}`
    ).then(response => response.json());
}