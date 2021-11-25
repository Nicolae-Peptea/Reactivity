import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List } from 'semantic-ui-react';
import Activty from '../Models/activity';
import NavBar from './NavBar';


function App() {
  const [activties, setActivities] = useState<Activty[]>([]);

  useEffect(
    () => {
    axios.get<Activty[]>("http://localhost:5000/api/Activities")
    .then(response => {
      setActivities(response.data);
    })
  }, [])

  return (
    <div>
      <NavBar />
        <List>
        {activties.map(activty => {
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
