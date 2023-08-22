import React, {useState} from 'react';
import { nanoid } from 'nanoid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

function AddGame(props){
  const[name, setName] = useState("");
  const[gameYear, setGameYear] = useState();
  const[genre, setGenre] = useState();
  const[developer, setDeveloper] = useState("");
  const[publisher, setPublisher] = useState("");
  const[selectedFile, setSelectedFile] = useState();

  const doWork = () => {
    const newGame = {
      'id': nanoid(),
      'name': name,
      'gameYear': parseInt(gameYear),
      'genre': genre,
      'developer': developer,
      'publisher': publisher,
      'image': URL.createObjectURL(selectedFile), // Store the image URL here
    };
    props.addGame(newGame);
  };  

  const imageUpdate = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  return(
    <div className='row mt-5' id='addGame'>
      <h3 id='add'>Add Game</h3>
      <div className='col-md-2'>
        <label htmlFor='txtName' className='form-label'>Name</label>
        <input type='text' id='textName' placeholder='Name' className='form-control' onChange={(evt) => setName(evt.currentTarget.value)} value={name} />
      </div>
      <div className='col-md-2'>
        <label htmlFor='txtDeveloper' className='form-label'>Developer</label>
        <input type='text' id='textDeveloper' placeholder='Developer' className='form-control' onChange={(evt) => setDeveloper(evt.currentTarget.value)} value={developer} />
      </div>
      <div className='col-md-2'>
        <label htmlFor='txtPublisher' className='form-label'>Publisher</label>
        <input type='text' id='textPublisher' placeholder='Publisher' className='form-control' onChange={(evt) => setPublisher(evt.currentTarget.value)} value={publisher} />
      </div>
      <div className='col-md-2'>
        <label htmlFor='txtGameYear' className='form-label'>Year of Release</label>
        <input type='text' id='textGameYear' placeholder='2000' className='form-control' onChange={(evt) => setGameYear(evt.currentTarget.value)} value={gameYear} />
      </div>
      <div className='col-md-2'>
        <label htmlFor='txtGenre' className='form-label'>Genre</label>
        <input type='text' id='textGenre' placeholder='Action' className='form-control' onChange={(evt) => setGenre(evt.currentTarget.value)} value={genre} />
      </div>
      <div className='col-md-2'>
        <label htmlFor='fileUpload' className='form-label'>Game Image</label>
        <input type='file' name='file' id='fileUpload' onChange={imageUpdate}/>
      </div>
      <div className='col-md-12'>
        <button type='button' id='btnAdd' className='btn btn-success btn-lg' onClick={doWork}>Add Game <FontAwesomeIcon icon={faPlusCircle}/></button>
      </div>
    </div>
  );
}

export default AddGame;