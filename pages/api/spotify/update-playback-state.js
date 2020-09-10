import Boom from "@hapi/boom";

import spotify from "./data";
import { log, LOG_LEVELS } from "../../../src/utils/logger";

const UPDATE_METHODS_ENUM = {
  PLAY: "play",
  PAUSE: "pause"
};

export default async function updatePlaybackState(req, res) {

  const {
    accessToken,
    contextUri = "",
    positionMs = 0,
    updateMethod,
    deviceId
   } = req.body;

  const data = {};
  let apiUrl = "/me/player/";

  // If a song is to be PLAYED, then check to see if we can use the 
  // "context_uri" and a seek position. On the other hand, a PAUSE method
  // does not require any additional parameters.
  if (updateMethod === "play") {
    apiUrl += UPDATE_METHODS_ENUM.PLAY;
    if (!contextUri || contextUri !== "") {
      data.context_uri = contextUri;
      data.position_ms = positionMs;
    }
    if (deviceId) {
      apiUrl += `?device_id=${deviceId}`;
    }
  } else if (updateMethod === "pause") {
    apiUrl += UPDATE_METHODS_ENUM.PAUSE;
  }

  const response = await spotify
    .put(apiUrl,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        }
      }
    )
    .catch(err => {
      log({
        message: "Unable to get update playback state: ",
        err,
        level: LOG_LEVELS.INFO
      });
    });

  if (!response) throw Boom.notFound();

  return res.status(200).json({});
}
