import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SPOTIFY_API,
    headers: {
      "Content-Type": "application/json"
    }
  });

export default instance;
