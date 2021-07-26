import axios from'axios'

axios.defaults.baseURL ='http://localhost:4000/api/';
axios.defaults.headers.common['x-auth-token'] =localStorage.getItem('x-auth-token');
/*axios.create({
    headers: {
      'Auth-Token': window.localStorage.getItem('currentUser'), //,
    },
    // You can add your headers here
  });
*/

/*const http = axios.create({

  headers: {
    'x-auth-token': window.localStorage.getItem('x-auth-token'), //,
  },
});

http.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
    if (error.response && (error.response.status == "401") ) {
        // window.open('/manager','_self');
    }
    return Promise.reject(error);
});*/
export default axios;