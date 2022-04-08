import axios from "axios";

export const baseURL = "http://localhost:8080";

const createInstance = () => {
  const data = localStorage.getItem("data");
  if (data && data.token) {
    return axios.create({
      baseURL: `${baseURL}/api/v1`,
      headers: {
        "Content-type": "application/json",
        authorization: data.token,
      },
    });
  }
  return axios.create({
    baseURL: `${baseURL}/api/v1`,
    headers: {
      "Content-type": "application/json",
    },
  });
};

export default createInstance();
