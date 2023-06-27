import axios from "axios";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:5001/clone-e9ba1/us-central1/api' //the API cloud function url
})

export default instance;