import axios from "axios";
import { BACKEND_API_BASE_URL } from '../configs/Constants';

class StudyService {
  static async getStudies() {
    const url = `${BACKEND_API_BASE_URL}/studies`;
    const reqOptions = {
      method: "GET",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }

  static async getStudy(sid) {
    const url = `${BACKEND_API_BASE_URL}/studies/${sid}`;
    const reqOptions = {
      method: "GET",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }

  static async createStudy(studyInfo) {
    const url = `${BACKEND_API_BASE_URL}/studies`;
    const reqOptions = {
      method: "POST",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      data: { studyInfo },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }

  static async deleteStudy(studyId) {
    const url = `${BACKEND_API_BASE_URL}/studies/${studyId}`;
    const reqOptions = {
      method: "DELETE",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }
}

export default StudyService;
