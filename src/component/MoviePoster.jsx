import React from 'react';
import { useNavigate } from 'react-router-dom';

const MoviePoster = ({ movieId, title, imageUrl, rating }) => {
  const posterUrl = imageUrl
    ? `https://image.tmdb.org/t/p/w500/${imageUrl}`
    : 'https://via.placeholder.com/300';

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div
      onClick={handleClick}
      style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center', cursor: 'pointer' }}
    >
      <img src={posterUrl} alt={title} style={{ width: '300px', height: '300px' }} />
      <h3>{title}</h3>
      <p>Rating: {rating}</p>
    </div>
  );
};

export default MoviePoster;
