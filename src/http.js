import axios from 'axios';

import {Loading} from "element-ui";

let loading; 

function startLoading() {
  loading = Loading.service({
    lock : true,
    text : '載入中',
    background : 'rgba(0,0,0,0.7)',
  });
} 

function endLoading() {
  loading.close();
}

axios.interceptors.request.use(request => {
  startLoading();
  if(localStorage.jwtToken) {
    request.headers.Authorization = localStorage.jwtToken
  }
  return request;
},error => {
  return Promise.reject(error);
});
axios.interceptors.response.use(response => {
  endLoading();
  return response;
},error => {
  endLoading();
});

export default axios;