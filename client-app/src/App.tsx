import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';


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
    <div>
      <Header as="h2" icon='users' content="Reactivities"/>
        <List>
        {activties.map((activty : any) => {
            return (
            <List.Item key={activty.id}>
              {activty.title}
            </List.Item>
            )
          })}
        </List>
    </div>
  );
}

export default App;
