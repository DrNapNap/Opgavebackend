import React, { useState, useEffect } from "react";

import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

function Ret() {
  const [gaader, setGaader] = useState({});
  const history = useHistory();
  const { _Post } = useParams();

  useEffect(() => {
    async function hentgaader() {
      try {
        let res = await axios.get("https://gaaders.herokuapp.com/gaader/" + _Post);
        let gaaderres = await res.data;
        //setJoke(jokeres); // Brug denne, hvis response fra API er opbygget på samme måde som det, der skal sendes til APIet – ELLER:
        setGaader({
          overskrift: gaaderres.gaade,
          joketekst: gaaderres.svar,
        }); 
      } catch (error) {
        console.log("FEJL: ", error);
      }
    }
    hentgaader();
  }, [_Post]);

  const retoke = (e) => {
    e.preventDefault();
    axios
      .patch("https://gaaders.herokuapp.com/gaader/" + _Post, gaader)
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
              defaultValue={gaader.gaade}
              onChange={(e) => setGaader({ ...gaader, gaade: e.target.value })}
              name="overskrift"
              className="form-control"
              placeholder="Jokens overskrift"
            />
          </div>
          <div className="form-group">
            <textarea
              defaultValue={gaader.svar}
              onChange={(e) => setGaader({ ...gaader, svar: e.target.value })}
              name="setGaader"
              className="form-control"
              rows="3"
              placeholder="setGaader her...."
            ></textarea>
          </div>
          <button
            type="button"
            onClick={() => {
              history.push("/Admin");
            }}
            className="btn btn-success mr-3"
          >
            Fortryd
          </button>
          <button type="submit" className="btn btn-primary">
            Ret Gaader
          </button>
        </form>
      </div>
    </div>
  );
}
export default Ret;
