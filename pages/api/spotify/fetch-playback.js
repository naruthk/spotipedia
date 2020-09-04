import spotify from "./data";
import { log, LOG_LEVELS } from "../../../src/utils/logger";

export default async function getCurrentPlayback(req, res) {
  if (!req.body.accessToken) return res.status(401).send("Unauthorized access");

  const response = await spotify
    .get(`/me/player?market=${req.body.market || "US"}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${req.body.accessToken}`,
        }
      },
    )
    .catch(err => {
      log({
        message: "Unable to get current playback: ",
        err,
        level: LOG_LEVELS.INFO
      });

      return res.status(400).json({});
    });

  if (response.status === 204) {
    log({
      message: "Unable to get current playback: No active song",
      level: LOG_LEVELS.INFO
    });

    return res.status(400).json({});
  }

  if (response.status === 401) {
    log({
      message: "Unable to get current playback: Token expired",
      level: LOG_LEVELS.INFO
    });

    return res.status(401).json({});
  }

  const { device, item, progress_ms } = response.data;

  if (!item) return res.status(400).json({});

  const { id, album, artists, duration_ms, name } = item;

  const artists_names_list = artists.map(artist => {
    return {
      id: artist.id,
      name: artist.name,
      href: artist.href
    }
  });

  const album_images_list = album.images.map(image => image.url);

  res.status(200).json({
    device: {
      id: device.id,
      name: device.name,
      type: device.type,
      is_active: device.is_active,
      volume: device.volume_percent
    },
    album: {
      name: album.name,
      images: album_images_list
    },
    artists: artists_names_list,
    songId: id,
    songName: name,
    duration: duration_ms,
    timeElapsed: progress_ms
  });
}
