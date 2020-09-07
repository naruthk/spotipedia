import spotify from "./data";
import { log, LOG_LEVELS } from "../../../src/utils/logger";

const UPDATE_METHODS_ENUM = {
  PLAY: "play",
  PAUSE: "pause"
};

const SPOTIFY_API_REASON_CODE_MAP = {
  NO_ACTIVE_DEVICE: "An active device could not be found."
};

export default async function updatePlaybackState(req, res) {
  if (!req.body.accessToken) return res.status(401).send("Unauthorized access");

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

      const { status, message } = err.response && err.response.data && err.response.data.error;

      return res.status(status).json({
        code: status,
        message: message && SPOTIFY_API_REASON_CODE_MAP[message] || "Sorry something went wrong."
      });
    });

  if (!response) return res.status(400).json({});

  return res.status(200).json({});
}