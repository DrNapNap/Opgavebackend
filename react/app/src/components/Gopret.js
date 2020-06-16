import React, { useState } from "react";
import axios from "axios";

import { useHistory } from 'react-router-dom'

function Gopret() {
  //state

  const [gaader, setGaader] = useState({});
  const history = useHistory();

  const sendG = e => {
    e.preventDefault();
    //send til backend


    axios
      .post("https://gaaders.herokuapp.com/gaader/admin", gaader)
      .then(res => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={sendG} className="row col-3 m-auto">
      <h1 className="text-center col-12 display-4 p-1">Opret ny gåder</h1>
      <br />
      <div className="form-group col-12">
        <br />
        <label className="fon2 display-4" htmlFor="formGroupExampleInput">
          gåder overskrift
        </label>
        <input
          className="col-12 form-control"
          onChange={e => setGaader({ ...gaader, gaade: e.target.value })}
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
          onChange={e => setGaader({ ...gaader, svar: e.target.value })}
          id="formGroupExampleInput2"
          placeholder="Tekst"
        />
      </div>
      <button type="submit" className="btn btn-info m-auto">
        Opret ny gaade
      </button>


    </form>
  );
}
export default Gopret;
