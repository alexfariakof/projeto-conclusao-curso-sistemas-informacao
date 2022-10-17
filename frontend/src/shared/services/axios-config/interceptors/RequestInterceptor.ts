import {AxiosRequestHeaders}  from 'axios';

export const requestInteceptor = (requestHeader: AxiosRequestHeaders) => {
    return requestHeader;
};