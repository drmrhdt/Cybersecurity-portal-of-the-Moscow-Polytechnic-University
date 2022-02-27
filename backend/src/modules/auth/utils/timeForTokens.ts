export const getTimeForRefreshToken = () => {
  const expiration = new Date();
  expiration.setTime(
    expiration.getTime() +
      parseInt(process.env.TTL_REFRESH_TOKEN_IN_DAYS || '30', 10) *
        1000 *
        60 *
        60 *
        24,
  );
  return expiration;
};

export const getTimeForAccessToken = () => {
  const expiration = new Date();
  expiration.setTime(
    expiration.getTime() +
      parseInt(process.env.TTL_ACCESS_TOKEN_IN_MINUTES || '5', 10) * 1000 * 60,
  );
  return expiration;
};
