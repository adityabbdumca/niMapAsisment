import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    const fetchCastDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`);
        const data = await response.json();
        setCast(data.cast);
      } catch (error) {
        console.error('Error fetching cast details:', error);
      }
    };

    fetchMovieDetails();
    fetchCastDetails();
  }, [id]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', textDecoration: 'underline' }}>{movie.title}</h1>
      <img style={{ width: '300px', margin: '1rem auto' }} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
      <p style={{ width: '40%', margin: '0 auto' }}>{movie.overview}</p>
      <p style={{ marginBlock: '1rem' }}>Rating: {movie.vote_average}</p>
      <p style={{ marginBottom: '2rem' }}>Release Date: {movie.release_date}</p>

      <h2 style={{ fontSize: '2rem', color: 'white' }}>Cast</h2>
      <div style={styles.castContainer}>
        {cast.slice(0, 12).map((member) => (
          <div key={member.cast_id} style={styles.castItem}>
            {member.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200/${member.profile_path}`}
                alt={member.name}
                style={styles.castImage}
              />
            ) : (
              <div style={styles.noImage}>No Image</div>
            )}
            <p>{member.name}</p>
            <p>{member.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  castContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '10px',
    marginTop: '20px',
  },
  castItem: {
    textAlign: 'center',
    marginBottom: '10px',
  },
  castImage: {
    width: '120px',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '8px',
  },
  noImage: {
    width: '120px',
    height: '180px',
    backgroundColor: '#ccc',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '14px',
  },
};

export default MovieDetails;
