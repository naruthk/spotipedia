import spotify from "./data";
import { log, LOG_LEVELS } from "../../../src/utils/logger";
import { SPOTIFY_API_STATUS_OUTPUT_FUNC_MAP } from "../../../src/utils/apisHelper";

export default async function fetchPlaylists(req, res) {
  if (!req.body.accessToken)
    return SPOTIFY_API_STATUS_OUTPUT_FUNC_MAP.ERROR_401(res);

  const response = await spotify
    .get("/me/playlists",
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${req.body.accessToken}`,
        }
      },
    )
    .catch(err => {
      log({
        message: "Unable to get playlists: ",
        err,
        level: LOG_LEVELS.INFO
      });

      const { reason } = err && err.response.data && err.response.data.error;

      if (err.status === 401) {
        log({
          message: "Unable to get current playback: Token expired",
          level: LOG_LEVELS.INFO,
          err
        });
      }

      return res.status(status).json({
        code: err.status,
        message: reason || "Sorry something went wrong. Please try again later."
      });
    });

  if (!response) return SPOTIFY_API_STATUS_OUTPUT_FUNC_MAP.ERROR_404(res);

  const { items, limit, next, previous, total } = response.data;

  const data = items.map(item => {
    return {
      id: item.id,
      name: item.name,
      images: item.images,
      tracks: item.tracks
    };
  });

  res.status(200).json({
    data,
    limit,
    next,
    previous,
    total
  });
}
