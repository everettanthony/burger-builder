import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-6498e.firebaseio.com/'
});

export default instance;