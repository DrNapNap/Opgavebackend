import React from 'react';
import Home from './components/Home'

import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Nav from './components/Nav';
import Admin from './components/Admin'
import Godelete from './components/Godelete'
import Gopret from './components/Gopret'
import Ret from './components/Goret'
import Logn from './components/auth/Logn'
function App() {
  return (
<div className="App">
      <BrowserRouter>
        <Nav />

        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/Admin' component={Admin} />
          
          <Route path='/Gopret' component={Gopret} />

          <Route path='/Godelete/:_Post' component={Godelete} />
          <Route path='/Ret/:_Post' component={Ret} />
          <Route path='/Logn' component={Logn} />

          
        </Switch>


      </BrowserRouter>
    </div>
  );
}

export default App;
