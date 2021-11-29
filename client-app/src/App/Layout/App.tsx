import React, { Fragment, useEffect } from 'react';
import {Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../Features/Activities/Dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponents';
import { useStore } from '../Stores/store';
import { observer } from 'mobx-react-lite';


function App() {
  const {activityStore} = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])

  if (activityStore.loadingInitial) return <LoadingComponent content="Loading App"/>

  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: "7em"}}>
        <ActivityDashboard />
      </Container>
    </Fragment>
  );
}

export default observer(App);
