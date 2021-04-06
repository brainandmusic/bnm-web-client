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

  static async getAssessmentsByTransid(transid) {
    const url = `${BACKEND_API_BASE_URL}/assessments?transid=${transid}`;
    const reqOptions = {
      method: "GET",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }

  static async updateAssessment(aid, assessmentInfo) {
    const url = `${BACKEND_API_BASE_URL}/assessments/${aid}`;
    const reqOptions = {
      method: "PUT",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      data: { assessmentInfo },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }

  static async deleteAssessment(aid) {
    const url = `${BACKEND_API_BASE_URL}/assessments/${aid}`;
    const reqOptions = {
      method: "DELETE",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }
}

export default AssessmentService;
