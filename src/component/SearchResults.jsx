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
    );
    const data = await response.json();
    console.log(data.results);
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
    return <p className="text-center my-4 text-gray-600">Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center w-full px-4 py-6">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">Search Results for "{query}"</h2>
      
      <div className="w-full sm:w-4/5 flex flex-wrap justify-center gap-4">
        {movies.length === 0 ? (
          <p className="text-lg text-gray-500">No movies found.</p>
        ) : (
          movies.map((movie) => (
            <MoviePoster 
              key={movie.id} 
              movieId={movie.id} 
              title={movie.title} 
              imageUrl={movie.poster_path} 
              rating={movie.vote_average} 
            />
          ))
        )}
      </div>
      
      {/* Pagination buttons */}
      <div className="my-7 w-full sm:w-3/5 flex items-center justify-center gap-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-red-300"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-green-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchResults;
