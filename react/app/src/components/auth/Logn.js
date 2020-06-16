import React, { useState } from "react";

import {  useHistory } from "react-router-dom";
import axios from "axios";

function Logn() {
  const [gaader, setGaader] = useState({});
  const history = useHistory();

  

  const retoke = (e) => {
    e.preventDefault();
    axios
    .post("https://gaaders.herokuapp.com/auth/login", gaader)
      .then((res) => {
        console.log(res.data);
        history.push("/Admin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="row">
      <div className="col">
        <h1 className="my-4">Ret gaader</h1>
        <form onSubmit={retoke}>
          <div className="form-group">
            <input
              onChange={(e) => setGaader({ ...gaader, email: e.target.value })}
              name="overskrift"
              className="form-control"
              placeholder="Jokens overskrift"
            />
          </div>
          <div className="form-group">
            <input
              
              onChange={(e) => setGaader({ ...gaader, password: e.target.value })}
              name="setGaader"
              className="form-control"
              rows="3"
              placeholder="setGaader her...."
            ></input>
          </div>
         
          <button type="submit" className="btn btn-primary">
            Ret Gaader
          </button>
        </form>
      </div>
    </div>
  );
}
export default Logn;
