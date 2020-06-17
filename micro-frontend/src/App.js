import React from 'react';
import logo from './logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Our Micro-Frontend!!</h1>
        <p>Running on: {process.env.REACT_APP_CONTENT_HOST}</p>
        <img src={`${process.env.REACT_APP_CONTENT_HOST}${logo}`} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
