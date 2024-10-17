import React, { useState, useEffect } from 'react';
import MoviePoster from './MoviePoster';

const TopRated = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1);

  const fetchTopRatedMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${currentPage}`
      );
      const data = await response.json();
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch top-rated movies');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopRatedMovies();
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

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex flex-col justify-center">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 300px)',
          gap: '50px',
          width: '55%',
          margin: '0 auto',
        }}
      >
        {movies.map((movie) => (
          <MoviePoster
            movieId={movie.id}
            key={movie.id}
            title={movie.title}
            imageUrl={movie.poster_path} // Relative path for the poster
            rating={movie.vote_average}
          />
        ))}
      </div>

      {/* Pagination buttons */}
      <div className="my-7 mx-auto text-center">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300 mr-4"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-300 ml-4"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TopRated;