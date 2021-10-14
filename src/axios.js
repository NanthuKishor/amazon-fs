import axios from "axios";
const instance = axios.create({
  baseURL:  "http://localhost:5001/fs-e1bc0/us-central1/api",
});

export default instance;

// "http://localhost:5001/fs-e1bc0/us-central1/api"
// "https://us-central1-fs-e1bc0.cloudfunctions.net/api"
// "https://us-central1-fs-e1bc0.cloudfunctions.net/api"