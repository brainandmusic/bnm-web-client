import axios from "axios";
import qs from "qs";
import { BACKEND_API_BASE_URL } from '../configs/Constants';

class StudyService {
  static createStudy(study) {
    const url = `${BACKEND_API_BASE_URL}/study/new`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded", "authorization": `Bearer ${localStorage.getItem("token")}` },
      data: qs.stringify(study),
      url,
    };
    return axios(options);
  }

  static getStudies(filter, projection) {
    const url = `${BACKEND_API_BASE_URL}/study/get`;
    const reqOptions = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded", "authorization": `Bearer ${localStorage.getItem("token")}` },
      data: qs.stringify({ filter, projection }),
      url,
    };
    return axios(reqOptions);
  }
}

export default StudyService;
