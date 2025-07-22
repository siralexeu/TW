import axios from 'axios';
// Crearea unei instanțe API cu fallback la localhost
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL});


// Adăugarea unui interceptor pentru a trimite token-ul de autorizare
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Preia token-ul din localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Setează token-ul în antetul cererii
  }
  return config;
});
// Funcția pentru înregistrarea unui utilizator
export const registerUser = (data) => API.post('/auth/register', data);

// Funcția pentru autentificarea unui utilizator
export const loginUser = (data) => API.post('/auth/login', data);

// Funcția pentru obținerea proiectelor
export const fetchProjects = () => API.get('/projects');

// Funcția pentru adăugarea unui proiect
export const addProject = (data) => API.post('/projects', data);
