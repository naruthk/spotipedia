import spotify from "./data";
import { log, LOG_LEVELS } from "../../../src/utils/logger";

export default async function fetchPlaylists(req, res) {
  if (!req.body.accessToken) return res.status(401).send("Unauthorized access");

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

      if (err.status === 401) {
        log({
          message: "Unable to get current playback: Token expired",
          level: LOG_LEVELS.INFO
        });
    
        return res.status(401).json(null);
      }

      throw err;
    });

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
