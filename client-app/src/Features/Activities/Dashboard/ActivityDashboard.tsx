import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../App/Layout/LoadingComponents";
import { useStore } from "../../../App/Stores/store";
import ActivityList from "./ActivityList";


export default observer (function ActivityDashboard() {
    const {activityStore} = useStore();

    useEffect(() => {
      activityStore.loadActivities();
    }, [activityStore])
  
    if (activityStore.loadingInitial) return <LoadingComponent content="Loading App"/>

    return(
        <Grid>
            <Grid.Column width='10'>
            <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Filters</h2>
            </Grid.Column>
        </Grid>
    )
})