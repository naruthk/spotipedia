export const SPOTIFY_API_STATUS_OUTPUT_FUNC_MAP = {
  ERROR_400: res => res.status(400).json({
    code: 400,
    message: "Looks like we've hit a dead end. Sorry, please try again."
  }),
  ERROR_401: res => res.status(401).json({
    code: 401,
    message: "Unauthorized access. Please try again."
  }),
  ERROR_404: res => res.status(404).json({
    code: 404,
    message: "The content you're looking for cannot be found at this time."
  })
};
