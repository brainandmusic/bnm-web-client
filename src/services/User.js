import axios from "axios";
import qs from "qs";
import { BACKEND_API_BASE_URL } from '../configs/Constants';

class UserService {
  static signup(firstName, lastName, email, password) {
    const url = `${BACKEND_API_BASE_URL}/user/register`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({ firstName, lastName, email, password }),
      url,
    };
    return axios(options);
  }
}

export default UserService;
