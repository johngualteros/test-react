import { useRef, useState, useMemo, useCallback } from "react";
import { searchMovies } from "../services/movies";

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previousSearh = useRef(search);

  const getMovies = useCallback(
    async ({search}) => {
      if (previousSearh.current === search) return;
      try {
        setLoading(true);
        setError(null);
        previousSearh.current = search;
        const movies = await searchMovies({ search });
        setMovies(movies);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }, []);

  const sortMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

  return { movies: sortMovies, getMovies, loading, error };
}
