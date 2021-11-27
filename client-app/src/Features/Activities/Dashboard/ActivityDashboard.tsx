import React from "react";
import { Grid } from "semantic-ui-react";
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
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
}

export default function ActivityDashboard({activities, selectedActivity,
        selectActivity, cancelSelectActivity, editMode,
        openForm, closeForm}: Props) {
    return(
        <Grid>
            <Grid.Column width='10'>
            <ActivityList activities={activities} selectActivity={selectActivity}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetails
                    activity={selectedActivity}
                    cancelSelectActivity={cancelSelectActivity}
                    openForm = {openForm}
                />}
                {editMode &&
                <ActivityForm closeForm ={closeForm} activity={selectedActivity}/>}
            </Grid.Column>
        </Grid>
    )
}