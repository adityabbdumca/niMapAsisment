import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './component/Header';

import Popular from './component/Popular';
import TopRated from './component/TopRated';
import Upcoming from './component/Upcoming';
import MovieDetails from './component/MovieDetails';
import SearchResults from './component/SearchResults';

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Popular />} />
        <Route path="upcoming" element={<Upcoming />} />
        <Route path="/toprated" element={<TopRated />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/search/:query" element={<SearchResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
