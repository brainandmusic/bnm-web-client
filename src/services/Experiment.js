import axios from "axios";
import qs from "qs";
import { BACKEND_API_BASE_URL } from '../configs/Constants';

class ExperimentService {
  static async getExperiments() {
    const url = `${BACKEND_API_BASE_URL}/experiments`;
    const reqOptions = {
      method: "GET",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }

  static async getExperiment(experimentId) {
    const url = `${BACKEND_API_BASE_URL}/experiments/${experimentId}`;
    const reqOptions = {
      method: "GET",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }

  static async deleteExperiment(experimentId) {
    const url = `${BACKEND_API_BASE_URL}/experiments/${experimentId}`;
    const reqOptions = {
      method: "DELETE",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }

  static async createExperiment(expInfo) {
    const url = `${BACKEND_API_BASE_URL}/experiments`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      data: { expInfo },
      url,
    };
    let res = await axios(options);
    return res.data;
  }



  // old
  static getExperimentCards(filter = {}, projection = {}, options = {}) {
    const url = `${BACKEND_API_BASE_URL}/experiment/card/get`;
    const reqOptions = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded", "authorization": `Bearer ${localStorage.getItem("token")}` },
      data: qs.stringify({ filter, projection, options }),
      url,
    };
    return axios(reqOptions);
  }

  static updateExperiment(updatedExp) {
    const url = `${BACKEND_API_BASE_URL}/experiment/update`;
    const reqOptions = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded", "authorization": `Bearer ${localStorage.getItem("token")}` },
      data: qs.stringify(updatedExp),
      url,
    };
    return axios(reqOptions);
  }
}

export default ExperimentService;
