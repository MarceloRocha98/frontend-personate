import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import { HashRouter } from 'react-router-dom'


import Router from './Router'

function App() {
  return (
   <HashRouter>
     <Router />
   </HashRouter>
  );
}

export default App;
