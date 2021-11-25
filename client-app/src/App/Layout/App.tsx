import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List } from 'semantic-ui-react';
import Activty from '../Models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../Features/Activities/Dashboard/ActivityDashboard';


function App() {
  const [activities, setActivities] = useState<Activty[]>([]);

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
        <ActivityDashboard activities={activities}/>
      </Container>
    </Fragment>
  );
}

export default App;
