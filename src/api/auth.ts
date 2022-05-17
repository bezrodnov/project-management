import axios from 'axios';

const signIn = (credentials: { login: string; password: string }) => axios.post('/signin', credentials).then(() => {});

const signUp = (user: { name: string; login: string; password: string }) => axios.post('/signup', user).then(() => {});

const signOff = () => axios.post<void>('/signoff');

export { signIn, signUp, signOff };
