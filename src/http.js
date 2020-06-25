import axios from 'axios';

import {Loading, Message} from "element-ui";
import router from './router';

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
  Message.error(error.response.data);
  const {status} = error.response;
  if(status == 401) {
    Message.error("授權失敗");
    localStorage.removeItem("jwtToken");
    router.push("/login");
  }
});

export default axios;