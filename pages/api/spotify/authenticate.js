import spotify from "./data";
import { log, LOG_LEVELS } from "../../../src/utils/logger";
import { SPOTIFY_API_STATUS_OUTPUT_FUNC_MAP } from "../../../src/utils/apisHelper";

export default async (req, res) => {
  if (!req.body.accessToken)
    return SPOTIFY_API_STATUS_OUTPUT_FUNC_MAP.ERROR_401(res);

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
  
  if (!response) return SPOTIFY_API_STATUS_OUTPUT_FUNC_MAP.ERROR_400(res);

  const { display_name: displayName, country, images, product } = response.data;

  res.status(200).json({
    displayName,
    country,
    images,
    product
  });
};
