/* eslint-disable react/prop-types */
export const ListOfMovies = ({ movies }) => {
  return (
    <ul className='movies'>
      {movies.map((movie) => (
        <li className='movie' key={movie.id}>
          <img src={movie.poster} alt={movie.title} />
          <div>
            <h2>{movie.title}</h2>
            <p>{movie.year}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export const ListOfMoviesWithNoResults = () => {
    return (
        <p>Search for a movie!</p>
    );
}

export const Movies = ({movies}) => {
    const hasMovies = movies?.length > 0;
    return (
        hasMovies 
        ? <ListOfMovies movies={movies} />
        : <ListOfMoviesWithNoResults />
    );
} 
