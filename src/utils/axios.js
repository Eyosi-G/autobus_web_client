import axios from "axios";

export const baseURL = "http://localhost:8080";
export default axios.create({
  baseURL: `${baseURL}/api/v1`,
  headers: {
    "Content-type": "application/json",
  },
});
