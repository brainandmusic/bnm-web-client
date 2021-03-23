import axios from "axios";
import { BACKEND_API_BASE_URL } from '../configs/Constants';

class AssessmentService {
  static async getAssessments(uid, status = undefined) {
    const url = `${BACKEND_API_BASE_URL}/assessments?uid=${uid}${status ? "&status=" + status : ""}`;
    const reqOptions = {
      method: "GET",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }
}

export default AssessmentService;
