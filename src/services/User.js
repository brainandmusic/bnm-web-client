import axios from "axios";
import { BACKEND_API_BASE_URL } from '../configs/Constants';

class UserService {
  static async signup(userInfo) {
    const url = `${BACKEND_API_BASE_URL}/users/register`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      data: { userInfo },
      url,
    };
    let res = await axios(options);
    return res.data;
  }

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

  static async getUsers() {
    const url = `${BACKEND_API_BASE_URL}/users`;
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

  static async signout() {
    const url = `${BACKEND_API_BASE_URL}/users/logout`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      url,
    };
    let res = await axios(options);
    return res.data;
  }

  static async setRole(uid, role) {
    const url = `${BACKEND_API_BASE_URL}/users/${uid}/role`;
    const options = {
      method: "PUT",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      data: { role },
      url,
    };
    let res = await axios(options);
    return res.data;
  }

  static async sendVerificationEmail(uid) {
    const url = `${BACKEND_API_BASE_URL}/users/${uid}/account/verify`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      url,
    };
    let res = await axios(options);
    return res.data;
  }

  static async verifyEmail(uid, token) {
    const url = `${BACKEND_API_BASE_URL}/users/${uid}/account/verify/token/${token}`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      url,
    };
    let res = await axios(options);
    return res.data;
  }

  static async forgetPassword(email) {
    const url = `${BACKEND_API_BASE_URL}/users/password/reset`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      data: { email },
      url,
    };
    let res = await axios(options);
    return res.data;
  }

  static async resetPassword(uid, token, password) {
    const url = `${BACKEND_API_BASE_URL}/users/${uid}/password/reset/token/${token}`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      data: { password },
      url,
    };
    let res = await axios(options);
    return res.data;
  }
}

export default UserService;
