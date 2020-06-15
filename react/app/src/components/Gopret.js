import React, { useState } from "react";
import axios from "axios";

import { useHistory } from 'react-router-dom'

function Gopret() {
  //state

  const [joke, setJoke] = useState({});
  const history = useHistory();

  const sendJoke = e => {
    e.preventDefault();
    //send til backend
    axios
      .post("https://gaaders.herokuapp.com/gaader/admin", joke)
      .then(res => {
        console.log(res.data);
        history.push("/Admin")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={sendJoke} className="row col-3 m-auto">
      <h1 className="text-center col-12 display-4 p-1">Opret ny joke</h1>
      <br />
      <div className="form-group col-12">
        <br />
        <label className="fon2 display-4" htmlFor="formGroupExampleInput">
          Joke overskrift
        </label>
        <input
          className="col-12 form-control"
          onChange={e => setJoke({ ...joke, gaade: e.target.value })}
          type="text"
          
          id="formGroupExampleInput"
          placeholder="Overskrift"
        />
      </div>
      <div className="form-group col-12">
        <label className="fon2 d display-4" htmlFor="formGroupExampleInput2">
          Tekst
        </label>
        <input
          type="text"
          className="form-control"
          onChange={e => setJoke({ ...joke, svar: e.target.value })}
          id="formGroupExampleInput2"
          placeholder="Tekst"
        />
      </div>
      <button type="submit" className="btn btn-info m-auto">
        Opret ny joke
      </button>

      <button onClick={() => {history.push("/Admin")}} type="submit" className="btn btn-info m-auto">
        Gå til Admin
      </button>
    </form>
  );
}
export default Gopret;
