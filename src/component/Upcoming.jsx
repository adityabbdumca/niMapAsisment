import React, {useState, useEffect} from 'react'
import MoviePoster from './MoviePoster';

//api = https://api.themoviedb.org/3/movie/upcoming?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=1

const Upcoming = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1);

  
    const fetchUpcomingMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=`
        );
        const data = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch upcoming movies');
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchUpcomingMovies();
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
    <div className='flex flex-col justify-center'>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 300px)', gap: '50px', width:'55%', margin:'0 auto' }}>
        {movies.map((movie) => (
          <MoviePoster
            movieId={movie.id}
            key={movie.id}
            title={movie.title}
            imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            rating={movie.vote_average}
          />
        ))}
      </div>
      {/* Pagination buttons */}
      <div className="my-7 mx-auto">
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
export default Upcoming;