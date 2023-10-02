/**
 * @param id - Number
 * @param genres - Array[] of genres
 */
export const getGenreTitleById = (id, genres) => {
  return genres.find((genre) => genre.id === id)?.name;
};
