import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


function App() {
  const [activties, setActivities] = useState([]);

  useEffect(
    () => {
    axios.get("http://localhost:5000/api/Activities")
    .then(response => {
      console.log(response);
      setActivities(response.data);
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          {activties.map((activty : any) => {
            return (<li key={activty.id}>
              {activty.title}
            </li>)
          })}
        </ul>
      </header>
    </div>
  );
}

export default App;
