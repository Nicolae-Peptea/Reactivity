import React from "react";
import { Grid, List } from "semantic-ui-react";
import Activty from "../../../App/Models/activity";
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
        </Grid>
    )
}