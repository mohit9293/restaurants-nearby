import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Details from './Details';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

const routes = (
  <Router>
     <Switch>
       <Route exact path="/">
         <App />
       </Route>
       <Route path="/:id">
         <Details />
       </Route>
     </Switch>
   </Router>
);

ReactDOM.render(routes, document.getElementById('root'));
