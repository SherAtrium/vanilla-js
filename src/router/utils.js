/**
 * @param path - string | pathname | URL
 *  */
export const getIdFromPathname = (path) => {
  const idMatch = path.match(/\/(\d+)$/);
  return idMatch ? idMatch[1] : null;
};
