import React, { useState, useEffect } from "react";

import {Link} from 'react-router-dom'
import Godelete from './Godelete'

import axios from "axios";

const Admin = (props) => {
  const [post, setPost] = useState({});

  useEffect(() => {
    axios.get("https://gaaders.herokuapp.com/Gaader/gaader").then((res) => {
      const p1 = res.data.slice(0,80);
    
      setPost(p1);

          });
  }, []);

  let postliste = "";

  if (post.length > 0) {
    postliste = post.map(p => {
      return (
        <div className="text2 row " key={p._id}>
      
      <div className="col-7 p-1 m-auto">
        <p className="text-black-50 p-1 m-3" >ID : {p._id} </p>
        <p className="col-12 p-1 m-3 ">OVERSKRIFT : {p.gaade.length > 50 ? p.gaade.substr(0, 50) + '....' : p.gaade}</p>
        <p className="col-12 p-1 m-3 ">TEKST : {p.svar.length > 70 ? p.svar.substr(0, 70) + '....' : p.svar}</p>
        <Link to={'/Ret/' + p._id} ><span className="col-4 " >RET</span></Link>
        <Link to={'/Godelete/' + p._id} ><span className="col-4 " >SLET</span></Link>
    </div>  
        
        
        </div>
      );
    });
  }else{
    return <h1>ingenpost</h1>
  }
  return <div>
  <Link to={'/Gopret'} className="col-4 m-auto">Opret ny Gopret</Link>
  
  
  <h1 className="display-2 text-center">Admin</h1>
  
  
  {postliste}
  
  
  
  </div>;
}
export default Admin;
