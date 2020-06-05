import winston from "winston";

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.label({ message: true }),
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.timestamp()
      ),
      level: "info"
    })
  ]
});

export const LOG_LEVELS = {
  ERROR: "error",
  INFO: "info",
  DEBUG: "debug"
};

export function log({ message, err, level }) {
  if (err) {
    const errorObject = err.response
      ? { status: err.response.status, data: err.response.data }
      : err;
    logger[level || LOG_LEVELS.ERROR](message, errorObject);
    return;
  }

  logger[level || LOG_LEVELS.INFO](message);
}

export default logger;
