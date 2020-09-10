import Boom from "@hapi/boom";

import spotify from "./data";
import { log, LOG_LEVELS } from "../../../src/utils/logger";

const resolveTracksinPlaylist = items => {
  return items.map(item => {
    const { track, added_at: addedAt } = item;

    const artists_names_list = track.album.artists.map(artist => {
      return {
        id: artist.id,
        name: artist.name,
        href: artist.href
      }
    });
    const album_images_list = track.album.images.map(image => image.url);
  
    return {
      id: track.id,
      trackUri: track.uri,
      albumUri: track.album.uri,
      addedAt,
      duration: track.duration_ms,
      name: track.name,
      popularity: track.popularity,
      artists: artists_names_list,
      images: album_images_list
    }
  })
}

export default async function fetchPlaylistDetail(req, res) {
  if (!req.body.apiUrl) throw Boom.notAcceptable("Missing URL");

  const response = await spotify
    .get(req.body.apiUrl,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${req.body.accessToken}`,
        }
      },
    )
    .catch(err => {
      log({
        message: "Unable to get playlist detail: ",
        err,
        level: LOG_LEVELS.INFO
      });
    });

  if (!response) throw Boom.notFound();

  const { items, limit, next, previous, total } = response.data;

  res.status(200).json({
    data: resolveTracksinPlaylist(items),
    limit,
    next,
    previous,
    total
  });
}
