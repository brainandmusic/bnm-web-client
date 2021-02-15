import axios from "axios";
import { BACKEND_API_BASE_URL } from '../configs/Constants';

class GroupService {
  static async getGroups() {
    const url = `${BACKEND_API_BASE_URL}/groups`;
    const reqOptions = {
      method: "GET",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }

  static async getGroup(gid) {
    const url = `${BACKEND_API_BASE_URL}/groups/${gid}`;
    const reqOptions = {
      method: "GET",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }

  static async deleteGroup(groupId) {
    const url = `${BACKEND_API_BASE_URL}/groups/${groupId}`;
    const reqOptions = {
      method: "DELETE",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }

  static async createGroup(groupInfo) {
    const url = `${BACKEND_API_BASE_URL}/groups`;
    const reqOptions = {
      method: "POST",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      data: { groupInfo },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }

  static async deleteMemberFromGroup(groupId, memberId) {
    const url = `${BACKEND_API_BASE_URL}/groups/${groupId}/members/${memberId}`;
    const reqOptions = {
      method: "DELETE",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }
}

export default GroupService;
