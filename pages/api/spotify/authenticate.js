import Boom from "@hapi/boom";

import spotify from "./data";
import { log, LOG_LEVELS } from "../../../src/utils/logger";

export default async (req, res) => {
  const response = await spotify
    .get("/me",
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${req.body.accessToken}`,
        }
      },
    )
    .catch(err => {
      log({
        message: "Unable to authenticate user with Spotify: ",
        err,
        level: LOG_LEVELS.INFO
      });

      throw Boom.unauthorized();
    });
  
  if (!response) throw Boom.notFound();

  const { display_name: displayName, country, images, product } = response.data;

  res.status(200).json({
    displayName,
    country,
    images,
    product
  });
};
