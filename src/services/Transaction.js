import axios from "axios";
import { BACKEND_API_BASE_URL } from '../configs/Constants';

class TransactionService {
  static async getTransactions(eventId) {
    const url = `${BACKEND_API_BASE_URL}/transactions${eventId ? "/?eventId=" + eventId : ""}`;
    const reqOptions = {
      method: "GET",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }

  static async createTransaction(transactionInfo) {
    const url = `${BACKEND_API_BASE_URL}/transactions`;
    const reqOptions = {
      method: "POST",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      data: { transactionInfo },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }

  static async deleteTransaction(transId) {
    const url = `${BACKEND_API_BASE_URL}/transactions/${transId}`;
    const reqOptions = {
      method: "DELETE",
      headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem("auth_token")}` },
      url,
    };
    let res = await axios(reqOptions);
    return res.data;
  }
}

export default TransactionService;
