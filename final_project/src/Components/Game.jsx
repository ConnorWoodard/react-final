import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning, faMagicWandSparkles } from "@fortawesome/free-solid-svg-icons";

function Game(props){

  const[editMode, setEditMode] = useState(false);
  const[name, setName] = useState("");
  const[gameYear, setGameYear] = useState();
  const[genre, setGenre] = useState();
  const[developer, setDeveloper] = useState("");
  const[publisher, setPublisher] = useState("");

  useEffect(() => {
    setName(props.game.name);
    setGameYear(props.game.gameYear);
    setGenre(props.game.genre);
    setDeveloper(props.game.developer);
    setPublisher(props.game.publisher);
  }, [props.game]);

  const saveGame = () => {
    setEditMode(false);
    const updatedGame = {name:name, gameYear:gameYear, genre:genre, developer:developer, publisher:publisher, id:props.game.id, image:props.game.image};
    props.updateGame(updatedGame);
  }

  return(
    <div className='card'>
      <img src={props.game.image} alt="Good Game" className='card-img-top mx-auto'/>
        {!editMode && <ul className='list-group list-group-flush'>
          <li className='list-group-item text-center'>{props.game.name}</li>
          <li className='list-group-item text-center'>{props.game.gameYear}</li>
          <li className='list-group-item text-center'>{props.game.genre}</li>
          <li className='list-group-item text-center'>{props.game.developer}</li>
          <li className='list-group-item text-center'>{props.game.publisher}</li>
          <button type='button' className='btn btn-danger' onClick={() => props.removeGame(props.game)}>Remove Game <FontAwesomeIcon icon={faWarning} /></button>
          <button type='button' className='btn btn-warning' onClick={() => setEditMode(true)}>Edit <FontAwesomeIcon icon={faMagicWandSparkles} /></button>
        </ul>
        }
        {editMode && <ul className='list-group list-group-flush'>
          <li className='list-group-item text-center'><input type='text' className='form-control' value={name} onChange={(evt) => setName(evt.currentTarget.value)}/></li>
          <li className='list-group-item text-center'><input type='text' className='form-control' value={gameYear} onChange={(evt) => setGameYear(evt.currentTarget.value)}/></li>
          <li className='list-group-item text-center'><input type='text' className='form-control' value={genre} onChange={(evt) => setGenre(evt.currentTarget.value)}/></li>
          <li className='list-group-item text-center'><input type='text' className='form-control' value={developer} onChange={(evt) => setDeveloper(evt.currentTarget.value)}/></li>
          <li className='list-group-item text-center'><input type='text' className='form-control' value={publisher} onChange={(evt) => setPublisher(evt.currentTarget.value)}/></li>
          <li className='list-group-item'><button id='btnSave' className='btn btn-secondary' onClick={saveGame}>Save</button></li>
        </ul>
        } 
   </div>
)};

export default Game;