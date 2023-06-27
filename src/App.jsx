import { useEffect, useState } from "react";
import "./App.css";
import Searchicon from "./assets/search.svg";
import MovieCard from "./MovieCard";

const API_URL = "https://www.omdbapi.com?apikey=60159aba";
const App = () => {
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  const [movies, setMovies] = useState([]);
  const [enteredMovie, setEnteredMovie] = useState("");

  const searchField = (e) => {
    const enteredValue = e.target.value;
    setEnteredMovie(enteredValue);
  };
  const searchButton = () => {
    searchMovies(enteredMovie);
  };

  useEffect(() => {
    searchMovies(enteredMovie);
  }, []);
  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search for Movies"
          value={enteredMovie}
          onChange={searchField}
        />
        <img src={Searchicon} alt="search" onClick={searchButton} />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard Movie1={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
            <h2>Please type in a movie title</h2>
        </div>
      )}
    </div>
  );
};

export default App;
