import React from "react";
import { Grid, List } from "semantic-ui-react";
import Activity from "../../../App/Models/activity";
import Activty from "../../../App/Models/activity";
import ActivityDetails from "../Details/ActivityDetails";
import ActivityForm from "../Form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
    activities: Activty[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
}

export default function ActivityDashboard({activities, selectedActivity,
        selectActivity, cancelSelectActivity}: Props) {
    return(
        <Grid>
            <Grid.Column width='10'>
            <ActivityList activities={activities} selectActivity={selectActivity}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && 
                <ActivityDetails  activity={selectedActivity} cancelSelectActivity={cancelSelectActivity}/>}
                <ActivityForm />
            </Grid.Column>
        </Grid>
    )
}