import Boom from "@hapi/boom";

import spotify from "./data";
import { log, LOG_LEVELS } from "../../../src/utils/logger";

const SKIP_METHODS_ENUMS = {
  NEXT: "next",
  PREVIOUS: "previous"
};

export default async function skipPrevNextTrack(req, res) {
  const direction = req.body.skipDirection;
  if (!direction || !Object.values(SKIP_METHODS_ENUMS).includes(direction)) 
    return Boom.notAcceptable("Missing additional parameter")

  await spotify
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

      throw Boom.notFound();
    });
    

  return res.status(200).json({});
}
