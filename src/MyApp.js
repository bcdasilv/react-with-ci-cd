import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Table from './Table';
import Form from './Form';

function MyApp () {
  const [characters, setCharacters] = useState([]);

  // const API_BASE_URL = 'http://localhost:5000';
  const API_BASE_URL = 'https://csc307-api.herokuapp.com';

  useEffect(() => {
    fetchAll().then(result => {
      if (result) { setCharacters(result) }
    })
  }, []);

  async function fetchAll () {
    try {
      const response = await axios.get(API_BASE_URL+'/users');
      return response.data.users_list;
    } catch (error) {
      // We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }

  async function makePostCall (person) {
    try {
      const response = await axios.post(API_BASE_URL+'/users', person);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function removeOneCharacter (index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    })
    setCharacters(updated);
  }

  function updateList (person) {
    makePostCall(person).then(result => {
      if (result && result.status === 200) { setCharacters([...characters, person]) }
    })
  }

  return (
    <div className='container'>
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  )
}

export default MyApp;
