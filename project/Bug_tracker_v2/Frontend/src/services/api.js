import axios from 'axios';

// Crearea unei instanțe API cu `baseURL` setat pe localhost
const API = axios.create({
  baseURL: 'http://localhost:5000', // Backend local
});

// Adăugarea unui interceptor pentru a trimite token-ul de autorizare în antet
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Preia token-ul din localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Adaugă token-ul în antetul cererii
  }
  return config;
});

// Adăugarea unui interceptor pentru a gestiona erorile de răspuns
API.interceptors.response.use(
  (response) => response, // Returnează răspunsul dacă cererea are succes
  (error) => {
    console.error('API Error:', error.response?.data || error.message); // Loghează eroarea
    if (error.response?.status === 401) {
      // Redirecționează utilizatorul la login dacă token-ul a expirat
      window.location.href = '/login';
    }
    return Promise.reject(error); // Propagă eroarea pentru tratare locală
  }
);

// Funcția pentru gestionarea token-ului
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token); // Salvează token-ul în localStorage
  } else {
    localStorage.removeItem('token'); // Șterge token-ul din localStorage
  }
};

// Funcția pentru înregistrarea unui utilizator
export const registerUser = (data) => API.post('/auth/register', data);

// Funcția pentru autentificarea unui utilizator
export const loginUser = async (data) => {
  const response = await API.post('/auth/login', data);
  setAuthToken(response.data.token); // Salvează token-ul după autentificare
  return response.data;
};

// Funcția pentru obținerea proiectelor
export const fetchProjects = () => API.get('/projects');

// Funcția pentru adăugarea unui proiect
export const addProject = (data) => API.post('/projects', data);

// Funcția generică pentru alte cereri API (opțională)
export const apiCall = async (method, url, data = null) => {
  try {
    const response = await API({
      method,
      url,
      data,
    });
    return response.data;
  } catch (err) {
    console.error('API Call Error:', err.response?.data || err.message);
    throw err;
  }
};
