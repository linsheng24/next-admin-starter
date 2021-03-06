import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = "http://127.0.0.1:3000/auth/";

class AuthService {
  async login(email, password) {
    return axios({
	    method: 'post',
      url: API_URL + 'login',
      data: {
        username: email,
        password: password
      }
    })
    .then(response => {
      if (response.data.access_token) {
	      Cookies.set('user', response.data.access_token)
      }
      return response.data;
    })
	  .catch(error => console.log(error));
  }

	logout() {
	  Cookies.remove('user')
  }

  register(username, email, password) {
    return axios.post(API_URL + "register", {
      username,
      email,
      password
    });
  }

  getCurrentUser(user) {
	  return axios({
		  url: API_URL + "user",
		  method: 'POST',
		  headers: {'Authorization': `Bearer ${user}`}
	  });
  }
}

export default new AuthService();