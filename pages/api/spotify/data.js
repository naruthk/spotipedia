import axios from "axios";
import Boom from "@hapi/boom";

import { log, LOG_LEVELS } from "../../../src/utils/logger";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SPOTIFY_API,
  headers: {
    "Content-Type": "application/json"
  }
});

instance.interceptors.response.use(
  res => {
    // TO-DO: Implement caching for specific URLs
    return res;
  },
  err => {
    if (err.response.data) {
      log({
        message: `Unable to fetch: ${err.config.url}`,
        level: LOG_LEVELS.ERROR
      });

      const { status} = err.response.data.error;

      if (status === 404) {
        throw Boom.notFound()
      }

      if (status === 401) {
        throw Boom.unauthorized()
      }
    }

    throw err;
  }
);

export default instance;
