import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

function Godelete() {
  const [joke, setJoke] = useState({});
  const { _Post } = useParams();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        let respons = await axios.get("https://gaaders.herokuapp.com/admin/gaader/" + _Post);
        setJoke(await respons.data);
      } catch (error) {
        console.log("fejl", error);
      }
    })();
  }, [_Post]);

  const handleSletJoke = (e) => {
    // Her med alm. axios med .then().catch() ... kan også laves som async-await som ex herover
    axios
      .delete("https://gaaders.herokuapp.com/admin/gaader/" + _Post)
      .then((res) => {
        console.log(res.data);
        // tilbage til admin-startsiden (tilpas adressen så den passer - se i app.js)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h1>Slet joke</h1>
      <div className="card mt-5">
        <div className="card-body">
          <h3 className="card-title">
            Er du sikker på at du vil slette denne joke:
          </h3>
          <h4>{joke.gaade}</h4>
          <p>{joke.svar}</p>
          <button
            className="btn btn-success mr-3"
            onClick={() => {
              history.push("/");
            }}
          >
            Fortryd
          </button>
          <button className="btn btn-danger" onClick={handleSletJoke}>
            SLET
          </button>
        </div>
      </div>
    </div>
  );
}
export default Godelete;
