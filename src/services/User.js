import axios from "axios";
import qs from "qs";
import { BACKEND_API_BASE_URL } from '../configs/Constants';

class UserService {
  static async signin(email, password) {
    const url = `${BACKEND_API_BASE_URL}/users/login`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      data: { email, password },
      url,
    };

    let res = await axios(options);
    return res.data;
  }

  static async getRole(uid) {
    const url = `${BACKEND_API_BASE_URL}/users/${uid}/role`;
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("auth_token")}`
      },
      url,
    };

    let res = await axios(options);
    return res.data;
  }

  static async getUser(uid) {
    const url = `${BACKEND_API_BASE_URL}/users/${uid}`;
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("auth_token")}`
      },
      url,
    };

    let res = await axios(options);
    return res.data;
  }

  static signout() {
    const url = `${BACKEND_API_BASE_URL}/users/logout`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded", "authorization": `Bearer ${localStorage.getItem("token")}` },
      url,
    };
    let res = axios(options);
    return res.data;
  }



  // legacy APIs

  static getProfile() {
    const url = `${BACKEND_API_BASE_URL}/user/profile`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded", "authorization": `Bearer ${localStorage.getItem("token")}` },
      url,
    };
    return axios(options);
  }
  static isAdmin() {
    const url = `${BACKEND_API_BASE_URL}/user/admin/get`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded", "authorization": `Bearer ${localStorage.getItem("token")}` },
      url,
    };
    return axios(options);
  }

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



  static sendVerificationEmail(email) {
    const url = `${BACKEND_API_BASE_URL}/user/sendVerifyEmail`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({ email }),
      url,
    };
    return axios(options);
  }

  static verifyEmail(email, token) {
    const url = `${BACKEND_API_BASE_URL}/user/verifyEmail`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({ email, token }),
      url,
    };
    return axios(options);
  }
}

export default UserService;
