import Boom from "@hapi/boom";

import spotify from "./data";
import { log, LOG_LEVELS } from "../../../src/utils/logger";

export default async function getCurrentPlayback(req, res) {
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
        message: "Unable to fetch active playback: ",
        err,
        level: LOG_LEVELS.INFO
      });
    });

  if (!response) throw Boom.notFound();

  const { status, data } = response;

  if (status === 204) {
    log({
      message: "Unable to fetch active playback: No active song",
      level: LOG_LEVELS.INFO
    });
  }

  if (!data) throw Boom.notFound();

  const { device, item, progress_ms } = data;

  if (!item) throw Boom.notFound();

  const { id, album, artists, duration_ms, name } = item;

  const artists_names_list = artists.map(artist => {
    return {
      id: artist.id,
      name: artist.name,
      href: artist.href
    }
  });

  const album_images_list = album.images.map(image => image.url);

  return res.status(200).json({
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
