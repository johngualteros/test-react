import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import debounce from 'just-debounce-it';
import { useCallback } from "react";

function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === '';
      return;
    }
    if (search === '') {
      setError("Please enter a movie name");
      return
    }
    if (search.match(/^[0-9]+$/)) {
      setError("Please enter a valid movie name");
      return
    }
    if (search.length < 3) {
      setError("please enter at least 3 characters");
      return
    }
    setError(null);
  }, [search]);


  return {search, updateSearch, error};
}

function App() {
  const [sort, setSort] = useState(false);
  const { search, updateSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovies({search, sort});

  const handleSubmit = (event) => {
    event.preventDefault();
    // can i get the all input with Object.fromEntries(new FormData(event.target))
    // const data = new window.FormData(event.target);
    // const query = data.get("query");
    getMovies( {search} );
  }

  const handleSort = () => {
    setSort(!sort);
  }

  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies({ search });
    }, 1000),[getMovies]) 

  const handleChange = (event) => {
    const { value } = event.target;
    if(value.startsWith(' ')) return;
    const newSearch = value;
    updateSearch(newSearch);

    debouncedGetMovies(newSearch);
  }

  return (
    <div className='page'>
      <header>
        <div>
          <h1>Movie Search</h1>
          <form onSubmit={handleSubmit}>
            <input onChange={handleChange} name="query" type="text" placeholder="Avengers, Star Wars ..." value={search}/>
            <input type="checkbox" onChange={handleSort} />
            <button>Search</button>
          </form>
          {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
      </header>
      <main>
        <Movies movies={movies}/>
        {
          loading && <p>Loading...</p>
        }
      </main>
    </div>
  );
}

export default App;
