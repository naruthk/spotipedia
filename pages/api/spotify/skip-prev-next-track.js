import spotify from "./data";
import { log, LOG_LEVELS } from "../../../src/utils/logger";

const SKIP_METHODS_ENUMS = {
  NEXT: "forward",
  PREVIOUS: "previous"
};

export default async function skipPrevNextTrack(req, res) {
  if (!req.body.accessToken) return res.status(401).send("Unauthorized access");

  if (!req.body.skipDirection || !Object.values(SKIP_METHODS_ENUMS).includes(req.body.skipDirection)) return res.status(404);

  const direction = req.body.skipDirection;

  console.log("accesstoken", req.body.accessToken);

  await spotify
    .post(`/me/player/${direction}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${req.body.accessToken}`,
        }
      },
    )
    .catch(err => {
      log({
        message: `Unable to get skip playback (direction: ${direction}): `,
        err,
        level: LOG_LEVELS.INFO
      });

      throw err;
    });

  res.status(200);
}
