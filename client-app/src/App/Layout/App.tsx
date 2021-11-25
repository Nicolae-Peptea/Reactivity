import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List } from 'semantic-ui-react';
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
    <Fragment>
      <NavBar />
      <Container style={{marginTop: "7em"}}>
          <List>
          {activties.map(activty => {
              return (
              <List.Item key={activty.id}>
                {activty.title}
              </List.Item>
              )
            })}
          </List>
        </Container>
    </Fragment>
  );
}

export default App;
