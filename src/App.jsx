import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ShowDescription from './ShowDescription';

const App = () => {
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [ageFilter, setAgeFilter] = useState('');
  const [selectedShow, setSelectedShow] = useState(null);

  useEffect(() => {
    axios.get('https://api.tvmaze.com/shows')
      .then(res => {
        setShows(res.data);
        setFilteredShows(res.data);
      })
  }, []);

  const handleSearch = event => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredShows = shows.filter(show =>
      show.name.toLowerCase().includes(searchTerm)
    );
    setFilteredShows(filteredShows);
  };

  const handleAgeFilter = event => {
    const age = event.target.value;
    setAgeFilter(age);
    if (age === "all") {
      setFilteredShows(shows);
    } else {
      const filteredShows = shows.filter(
        show => show.rating.average >= age
      );
      setFilteredShows(filteredShows);
    }
  };

  const handleShowClick = (show) => {
    setSelectedShow(show);
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className='logo'>TV MAZE</h1>
        <input
          type="text"
          className='Search-placeholder'
          placeholder="Search shows"
          onChange={handleSearch}
        />
        <label className='filter'>
          Filter by Age:
          <select className='filter-box' value={ageFilter} onChange={handleAgeFilter}>
            <option value="all">All</option>
            <option value="7">7+</option>
            <option value="8">8+</option>
            <option value="9">9+</option>
          </select>
        </label>

      </header>
      <div className='show-list'>
        <div className='show-cards'>
          {filteredShows.map(show => (
            <div key={show.id} className="show-card" >
              <img src={show.image.medium} alt={show.name} className='show-img' onClick={() => handleShowClick(show)} />
              <p className='show-names'>{show.name}</p>
            </div>
          ))}
        </div>
      </div>
      {selectedShow && <ShowDescription show={selectedShow} />}
    </div>
  );
}
export default App;