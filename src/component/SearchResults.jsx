import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MoviePoster from './MoviePoster'; // Assuming you have a MoviePoster component for displaying movies

const SearchResults = () => {
  const { query } = useParams(); // Get the search query from the URL
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1);

    const fetchMovies = async () => {
      setLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${query}&page=${currentPage}`
       // `https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&language=en-US&query=${query}&page=1`

      );
      const data = await response.json();
      console.log(data.results)
      setTotalPages(data.total_pages);
      setMovies(data.results);
      setLoading(false);
    };

    useEffect(() => {
      fetchMovies();
    }, [currentPage]);

    const handlePrevious = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1); // Go to the previous page
      }
    };
  
    const handleNext = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1); // Go to the next page
      }
    };



  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="movie-list">
      <h2>Search Results for "{query}"</h2>
      <div className="w-4/5 mx-auto my-6 flex flex-wrap justify-center gap-4">
        {movies.length === 0 ? (
          <p>No movies found.</p>
        ) : (
          movies.map((movie) => (
            <MoviePoster movieId={movie.id} title={movie.title} imageUrl={movie.poster_path} rating={movie.vote_average} />
          ))
        )}
      </div>
      {/* Pagination buttons */}
      <div className="my-7 w-2/4 mx-auto">
        <button
          style={{backgroundColor:'red', marginRight:'1rem'}}
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          style={{backgroundColor:'green', marginLeft:'1rem'}}
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchResults;
