import React from 'react';
import { BrowserRouter as Router, Routes , Route } from "react-router-dom";
import { Toast } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import Favorite from './Pages/FavoritesPage/favorites';
import Page404 from './Pages/Page404/page404'
import Navigate from './Components/Navigator'
import Weather from './Pages/WeatherPage/Weather'

function App() {
  return (
    <>
    <div className='web-page'>
      <div><Navigate /></div>
      <div></div>
    </div>
    <Router>
      <Routes>
        <Route path='/' element={<Weather />} />
        <Route path='/weather' element={<Weather />} />
        <Route path='/favorite' element={ <Favorite/>} />
        <Route path="*" element={<Page404/>} />
      </Routes>
    </Router>
  </>
  );
}

export default App;
