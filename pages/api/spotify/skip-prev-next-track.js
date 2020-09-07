import spotify from "./data";
import { log, LOG_LEVELS } from "../../../src/utils/logger";
import { SPOTIFY_API_STATUS_OUTPUT_FUNC_MAP } from "../../../src/utils/apisHelper";

const SKIP_METHODS_ENUMS = {
  NEXT: "next",
  PREVIOUS: "previous"
};

export default async function skipPrevNextTrack(req, res) {
  if (!req.body.accessToken)
    return SPOTIFY_API_STATUS_OUTPUT_FUNC_MAP.ERROR_401(res);

  const direction = req.body.skipDirection;

  if (!direction || !Object.values(SKIP_METHODS_ENUMS).includes(direction)) 
    return SPOTIFY_API_STATUS_OUTPUT_FUNC_MAP.ERROR_400(res);

  const response = await spotify
    .post(`/me/player/${direction}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${req.body.accessToken}`,
        }
      }
    )
    .catch(err => {
      log({
        message: `Unable to get skip playback (direction: ${direction}): `,
        err,
        level: LOG_LEVELS.INFO
      });

      return SPOTIFY_API_STATUS_OUTPUT_FUNC_MAP.ERROR_400(res);
    });

  if (!response) SPOTIFY_API_STATUS_OUTPUT_FUNC_MAP.ERROR_404(res);

  return res.status(200).json({});
}
