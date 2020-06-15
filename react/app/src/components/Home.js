import React, { useState, useEffect } from "react";
import axios from 'axios';

import CircularProgress from '@material-ui/core/CircularProgress';

const Home = () => {
  const [posts, setPosts] = useState({});
  useEffect(() => {
    axios
        .get("https://gaaders.herokuapp.com/Gaader/gaader")
        .then(res => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);
  const postList = posts.length ? (
    posts.map(post => {
      return (
        <div key={post._id}>
          <div>{post.gaade}</div>
      <div>{post.svar}</div>

            <br/>
        </div>
      )
    })
  ) : (
    <div>
    <CircularProgress />
    </div>
  );
  return (
    <div>
      {postList}
      </div>
)
}
export default Home;