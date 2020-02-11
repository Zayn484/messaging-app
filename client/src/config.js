import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:5000/api'
});

export const token = localStorage.getItem('token');
export const name = localStorage.getItem('name');

export default instance;
