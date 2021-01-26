import axios from "axios";
import qs from "qs";
import { BACKEND_API_BASE_URL } from '../configs/Constants';

class ExperimentService {
  static getExperiments(filter = {}, projection = {}, options = {}) {
    const url = `${BACKEND_API_BASE_URL}/experiment/get`;
    const reqOptions = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded", "authorization": `Bearer ${localStorage.getItem("token")}` },
      data: qs.stringify({ filter, projection, options }),
      url,
    };
    return axios(reqOptions);
  }
}

export default ExperimentService;
