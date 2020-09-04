import spotify from "./data";
import { log, LOG_LEVELS } from "../../../src/utils/logger";

const METHODS_ENUMS = {
  PAUSE: "pause",
  PLAY: "play",
  NEXT: "forward",
  PREVIOUS: "previous"
};

export default async function updateCurrentPlayback(req, res) {
  if (!req.body.accessToken) return res.status(401).send("Unauthorized access");
}
