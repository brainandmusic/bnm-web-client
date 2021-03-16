import axios from "axios";
import { BACKEND_API_BASE_URL } from '../configs/Constants';

class StudyService {
  static async getStudies(uid = null) {
    const url = `${BACKEND_API_BASE_URL}/studies${uid ? ("/?uid=" + uid) : ""}`;
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

  static async getMembers(sid) {
    const url = `${BACKEND_API_BASE_URL}/studies/${sid}/members`;
    const reqOptions = {
      method: "GET",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }

  static async deleteMember(studyId, memberId) {
    const url = `${BACKEND_API_BASE_URL}/studies/${studyId}/members/${memberId}`;
    const reqOptions = {
      method: "DELETE",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }

  static async addMembers(studyId, memberIds) {
    const url = `${BACKEND_API_BASE_URL}/studies/${studyId}/members`;
    const reqOptions = {
      method: "POST",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      data: { memberIds },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }

  static async getParticipants(sid) {
    const url = `${BACKEND_API_BASE_URL}/studies/${sid}/participants`;
    const reqOptions = {
      method: "GET",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }

  static async addParticipants(studyId, participantIds) {
    const url = `${BACKEND_API_BASE_URL}/studies/${studyId}/participants`;
    const reqOptions = {
      method: "POST",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      data: { participantIds },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }

  static async deleteParticipant(studyId, participantId) {
    const url = `${BACKEND_API_BASE_URL}/studies/${studyId}/participants/${participantId}`;
    const reqOptions = {
      method: "DELETE",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }

  static async getArm(sid, aid) {
    const url = `${BACKEND_API_BASE_URL}/studies/${sid}/arms/${aid}`;
    const reqOptions = {
      method: "GET",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }

  static async getArms(sid) {
    const url = `${BACKEND_API_BASE_URL}/studies/${sid}/arms`;
    const reqOptions = {
      method: "GET",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }

  static async deleteArm(studyId, armId) {
    const url = `${BACKEND_API_BASE_URL}/studies/${studyId}/arms/${armId}`;
    const reqOptions = {
      method: "DELETE",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }

  static async createArm(studyId, armInfo) {
    const url = `${BACKEND_API_BASE_URL}/studies/${studyId}/arms`;
    const reqOptions = {
      method: "POST",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      data: { armInfo },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }

  static async createEvent(studyId, armId, eventInfo) {
    const url = `${BACKEND_API_BASE_URL}/studies/${studyId}/arms/${armId}/events`;
    const reqOptions = {
      method: "POST",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      data: { eventInfo },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }

  static async deleteEvent(studyId, armId, eventId) {
    const url = `${BACKEND_API_BASE_URL}/studies/${studyId}/arms/${armId}/events/${eventId}`;
    const reqOptions = {
      method: "DELETE",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }

  static async addExperimentsToEvent(studyId, armId, eventId, expIds) {
    const url = `${BACKEND_API_BASE_URL}/studies/${studyId}/arms/${armId}/events/${eventId}/experiments`;
    const reqOptions = {
      method: "POST",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      data: { expIds },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }

  static async deleteExperiments(studyId, armId, eventId, expIds) {
    const url = `${BACKEND_API_BASE_URL}/studies/${studyId}/arms/${armId}/events/${eventId}/experiments`;
    const reqOptions = {
      method: "DELETE",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      data: { expIds },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }
}

export default StudyService;
