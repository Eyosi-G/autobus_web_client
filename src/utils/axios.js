import axios from "axios";

export const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://autobus.herokuapp.com"
    : "http://localhost:8080";

const createInstance = () => {
  const data = localStorage.getItem("data");
  console.log(data, "ceate instance");
  if (data && JSON.parse(data).token) {
    return axios.create({
      baseURL: `${baseURL}/api/v1`,
      headers: {
        "Content-type": "application/json",
        authorization: JSON.parse(data).token,
      },
      timeout: 5000
    });
  }
  return axios.create({
    baseURL: `${baseURL}/api/v1`,
    headers: {
      "Content-type": "application/json",
    },
    timeout: 5000
  });
};

export default createInstance;
