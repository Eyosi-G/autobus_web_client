import axios from "axios";

export const baseURL = "http://localhost:8080";

const createInstance = () => {
  const data = localStorage.getItem("data");
  console.log(data)
  if (data && JSON.parse(data).token) {
    return axios.create({
      baseURL: `${baseURL}/api/v1`,
      headers: {
        "Content-type": "application/json",
        authorization: JSON.parse(data).token,
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
