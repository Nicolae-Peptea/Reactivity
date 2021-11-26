import React from "react";
import { Grid, List } from "semantic-ui-react";
import Activty from "../../../App/Models/activity";
import ActivityDetails from "../Details/ActivityDetails";
import ActivityForm from "../Form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
    activities: Activty[]
}

export default function ActivityDashboard({activities}: Props) {
    return(
        <Grid>
            <Grid.Column width='10'>
            <ActivityList activities={activities}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {activities[0] && 
                <ActivityDetails  activity={activities[0]}/>}
                <ActivityForm />
            </Grid.Column>
        </Grid>
    )
}