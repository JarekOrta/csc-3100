// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);
    
  function fetchUsers() {
    return fetch("http://localhost:8000/users");
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);});
      }, []);

  function deleteUser(id) {
    return fetch(`http://localhost:8000/users/${id}`, {
    method: "DELETE",
  });
}
  


  function postUser(person) {
    return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
  }
  

  function removeOneCharacter(index) {
    const id = characters[index].id;

    deleteUser(id)
      .then((response) => {
        if (response.status === 204) {
          const updated = characters.filter((characters, i) => {
            return i !== index;
          });
          setCharacters(updated);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }




  function updateList(person){
  postUser(person)
    .then((response) => {
      if (response.status !== 201) {
        throw new Error("user was not created");
      }
      return response.json();
    })
    .then((newUser) => {
      setCharacters([...characters, newUser]);
    })
    .catch((error) => {
      console.log(eror);
    });
  }
      

  return (
  <div className="container">
    <Table characterData={characters} removeCharacter={removeOneCharacter} />
  <Form handleSubmit={updateList} />
  </div>
);
}


export default MyApp;

