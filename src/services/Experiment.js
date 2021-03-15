import axios from "axios";
import { BACKEND_API_BASE_URL } from '../configs/Constants';

class ExperimentService {
  static async getExperiments(summary = 0) {
    const url = `${BACKEND_API_BASE_URL}/experiments${summary === 1 ? "/?summary=1" : ""}`;
    const reqOptions = {
      method: "GET",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }

  static async getExperiment(experimentId, summary = 0) {
    const url = `${BACKEND_API_BASE_URL}/experiments/${experimentId}${summary === 1 ? "/?summary=1" : ""}`;
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

  static async updateExperiment(experimentId, updatedFields) {
    const url = `${BACKEND_API_BASE_URL}/experiments/${experimentId}`;
    const reqOptions = {
      method: "PUT",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      data: { updatedFields },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }
}

export default ExperimentService;
