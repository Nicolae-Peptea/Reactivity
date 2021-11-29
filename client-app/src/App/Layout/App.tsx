import React, { Fragment, useEffect, useState } from 'react';
import {Container } from 'semantic-ui-react';
import Activity from '../Models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../Features/Activities/Dashboard/ActivityDashboard';
import {v4 as uuid} from "uuid"
import agent from '../API/Agent';
import LoadingComponent from './LoadingComponents';
import { useStore } from '../Stores/store';
import { observer } from 'mobx-react-lite';


function App() {
  const {activityStore} = useStore();



  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])

  function handleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true);
    
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x=> x.id !== activity.id), activity]);
      })
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
      })
    }

    setSelectedActivity(activity);
    setTimeout(() => {
      setEditMode(false);
      setSubmitting(false);
    }, 1000);

  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() =>{
      setActivities([...activities.filter(x => x.id !== id)])
      setTimeout(() => {
        setSubmitting(false);
      }, 1000);
    }); 
   
  }

  if (activityStore.loadingInitial) return <LoadingComponent content="Loading App"/>

  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: "7em"}}>
        <ActivityDashboard 
          activities={activityStore.activities}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </Fragment>
  );
}

export default observer(App);
