import axios from "axios";
import qs from "qs";
import { BACKEND_API_BASE_URL } from '../configs/Constants';

class ExperimentService {
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

  static getExperiment(id) {
    const url = `${BACKEND_API_BASE_URL}/experiment/get`;
    const reqOptions = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded", "authorization": `Bearer ${localStorage.getItem("token")}` },
      data: qs.stringify({ experimentId: id }),
      url,
    };
    return axios(reqOptions);
  }

  static deleteExperiment(experimentId) {
    const url = `${BACKEND_API_BASE_URL}/experiment/delete`;
    const reqOptions = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded", "authorization": `Bearer ${localStorage.getItem("token")}` },
      data: qs.stringify({ experimentId }),
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
