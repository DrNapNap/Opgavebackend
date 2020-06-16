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
        
       // history.push("/Admin");
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="row">
      <div className="col">
        <h1 className="my-4">Ret gaader</h1>
        <form  onSubmit={retoke} action='/login'>
          <div className="form-group">
            <input
              onChange={(e) => setGaader({ ...gaader, email: e.target.value })}
              className="form-control"
              type='email' name='email' placeholder='Email'
            />
          </div>
          <div className="form-group">
            <input
              
              onChange={(e) => setGaader({ ...gaader, password: e.target.value })}

              className="form-control"
              type='password' name='password' placeholder='Password'
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
