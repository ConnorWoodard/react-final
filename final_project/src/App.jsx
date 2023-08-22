import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import _ from 'lodash';
import AddGame from './Components/AddGame';
import Game from './Components/Game';
import {nanoid } from 'nanoid';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
function App() {

  const[allGames, setAllGames] = useState(null);
  const[searchResults, setSearchResults] = useState(null);
  const[keywords, setKeywords] = useState('');
  const[gameYear, setGameYear] = useState('');

  useEffect(() => {
    if(localStorage) {
      const gamesLocalStorage = JSON.parse(localStorage.getItem('games'));

      if(gamesLocalStorage){
        saveGames(gamesLocalStorage);
      } else {
        saveGames(games);
      }
    }
  }, []);

  const saveGames = (games) => {
    setAllGames(games);
    setSearchResults(games);
    if(localStorage){
      localStorage.setItem('games', JSON.stringify(games));
    }
  }

  const addGame = (newGame) => {
    const updatedGames = [...allGames, newGame];
    saveGames(updatedGames);
  };

  const searchGames = () => {
    let keywordsArray = [];

    if(keywords){
      keywordsArray = keywords.toLowerCase().split(' ');
    }

    if(gameYear){
      keywordsArray.push(gameYear.toString());
    }
    
    if(keywordsArray.length > 0){
      const searchResults = allGames.filter(game => {
        for(const word of keywordsArray){
          if(game.name.toLowerCase().includes(word) ||
            game.gameYear === parseInt(word)){
              return true;
            }
        }
        return false;
      });
      setSearchResults(searchResults);
    } else {
      setSearchResults(allGames);
    }
    
  }

  const removeGame = (gameToDelete) => {
    const updatedGamesArray = allGames.filter(game => game.id !== gameToDelete.id);
    saveGames(updatedGamesArray);
  }

  const updateGame = (updatedGame) => {
    const updatedGamesArray = allGames.map(game => game.id === updatedGame.id ? {...game, ...updatedGame} : game);
    saveGames(updatedGamesArray);
  }

  const games = [{
  id:nanoid(),
  name: "Diablo",
  gameYear: 1996,
  genre: "Roguelike",
  developer: "Blizzard Entertainment",
  publisher: "Electronic Arts",
  image: require("./images/diablo.jpeg")
}, {
  id:nanoid(),
  name: "Legend of Zelda: Ocarina of Time",
  gameYear: 1998,
  genre: "Action-Adventure",
  developer: "Nintendo",
  publisher: "Nintendo",
  image: require("./images/lozoot.jpg")
}, {
  id:nanoid(),
  name: "Grand Theft Auto III",
  gameYear: 2001,
  genre: "Action-Adventure",
  developer: "DMA Design",
  publisher: "Rockstar Games",
  image: require("./images/gta3.jpg")
}, {
  id:nanoid(),
  name: "Metroid Prime",
  gameYear: 2002,
  genre: "FPS",
  developer: "Retro Studios",
  publisher: "Nintendo",
  image: require("./images/metroidprime.jpeg")
}, {
  id:nanoid(),
  name: "World of Warcraft",
  gameYear: 2004,
  genre: "MMO",
  developer: "Blizzard",
  publisher: "Blizzard",
  image: require("./images/wow.png")
}, {
  id:nanoid(),
  name: "Resident Evil 4",
  gameYear: 2005,
  genre: "Horror",
  developer: "Capcom",
  publisher: "Capcom",
  image: require("./images/re4.jpg")
}, {
  id:nanoid(),
  name: "Super Mario Galaxy",
  gameYear: 2007,
  genre: "Platformer",
  developer: "Nintendo",
  publisher: "Nintendo",
  image: require("./images/smg.jpg")
}, {
  id:nanoid(),
  name: "The Witcher 3: Wild Hunt",
  gameYear: 2015,
  genre: "Action-Adventure",
  developer: "CD Projekt RED",
  publisher: "Warner Bros. Games.",
  image: require("./images/wwh.jpg")
}, {
  id:nanoid(),
  name: "Legend of Zelda: Breath of the Wild",
  gameYear: 2017,
  genre: "Action-Adventure",
  developer: "Nintendo",
  publisher: "Nintendo",
  image: require("./images/bow.jpg")
}, {
  id:nanoid(),
  name: "Elden Ring",
  gameYear: 2022,
  genre: "Action-RPG",
  developer: "FromSoftware Inc.",
  publisher: "FromSoftware Inc.",
  image: require("./images/elden.jpeg")
  }];



  return (
    <div className='container'>
      <div className='row' id='allGames'>
        <h3 id='goy'>Games of the Years</h3>
        {searchResults && searchResults.map((game) => 
        (
          <div className='col-md-2' key={game.id}>
            <Game game={game} removeGame={removeGame} updateGame={updateGame} />
          </div>)
        )}
      </div>
      <AddGame addGame={addGame} />
      <div className='row mt-4' id='searchGames'>
        <h3>Search Games</h3>
      <div className='col-md-4'>
        <label htmlFor='txtKeywords'>Search by Name, Publisher, or Developer</label>
        <input type='text' className='form-control' placeholder='Name, Publisher, Developer' onChange={evt => setKeywords(evt.currentTarget.value)} value={keywords} />
      </div>
      <div className='col-md-4'>
        <select value={gameYear} onChange={evt => setGameYear(evt.currentTarget.value)} className='form-select'>
          <option value="">Select Year</option>
          {_(allGames).map(game => game.gameYear).sort().uniq().map(year => <option key={year} value={year}>{year}</option>).value()}
        </select>
      </div>
      <div className='col-md-4'>
        <button type='button' className='btn btn-primary' onClick={searchGames}>Search Games <FontAwesomeIcon icon={faMagnifyingGlass} /></button>
      </div>
      </div>
    </div>
  );
}

export default App;
