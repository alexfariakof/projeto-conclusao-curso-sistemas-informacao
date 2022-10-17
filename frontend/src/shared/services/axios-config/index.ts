import  axios from 'axios';
import { environment } from '../../environment';
import { responseInteceptor } from './interceptors';


const Api = axios.create({
    baseURL: environment.URL_BASE,       
    withCredentials: false,
    responseType: 'json',
    responseEncoding: 'utf8',
    validateStatus: function (status) {
      return status >= 200 && status < 300; // default
    },
    insecureHTTPParser: false

 });

 Api.interceptors.request.use(config => {
  // log a message before any HTTP request is sent
  console.log('Request was sent');

  return config;
});

 
Api.interceptors.response.use(
  (response)  => responseInteceptor(response),
  //(error)  => errorInteceptor(error),
);

export { Api };