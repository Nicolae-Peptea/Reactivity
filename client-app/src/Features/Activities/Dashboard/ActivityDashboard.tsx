import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import Activity from "../../../App/Models/activity";
import Activty from "../../../App/Models/activity";
import { useStore } from "../../../App/Stores/store";
import ActivityDetails from "../Details/ActivityDetails";
import ActivityForm from "../Form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
    activities: Activty[];
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default observer (function ActivityDashboard({activities, createOrEdit, deleteActivity, submitting}: Props) {
    const {activityStore} = useStore();
    const {selectedActivity, editMode} = activityStore;

    return(
        <Grid>
            <Grid.Column width='10'>
            <ActivityList 
                activities={activities}
                deleteActivity={deleteActivity}
                submitting={submitting}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetails/>}
                {editMode &&
                <ActivityForm
                    createOrEdit={createOrEdit}
                    submitting={submitting}
                />}
            </Grid.Column>
        </Grid>
    )
})