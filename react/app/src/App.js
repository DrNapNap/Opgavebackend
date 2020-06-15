import React from 'react';
import Home from './components/Home'

import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Nav from './components/Nav';
import Admin from './components/Admin'
import Godelete from './components/Godelete'
function App() {
  return (
<div className="App">
      <BrowserRouter>
        <Nav />

        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/Admin' component={Admin} />
          

          <Route path='/Godelete' component={Godelete} />


        </Switch>


      </BrowserRouter>
    </div>
  );
}

export default App;
