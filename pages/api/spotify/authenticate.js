import spotify from "./data";
import { log, LOG_LEVELS } from "../../../src/utils/logger";

export default async (req, res) => {
  if (!req.body.accessToken) return res.status(401).send("Unauthorized access");

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

      throw err;
    });
  
  if (!response) return res.status(400).json({});

  const { display_name: displayName, country, images, product } = response.data;

  res.status(200).json({
    displayName,
    country,
    images,
    product
  });
};
