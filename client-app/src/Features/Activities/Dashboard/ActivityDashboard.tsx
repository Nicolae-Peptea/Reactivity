import React from "react";
import { Grid, List } from "semantic-ui-react";
import Activty from "../../../App/Models/activity";

interface Props {
    activities: Activty[]
}

export default function ActivityDashboard({activities}: Props) {
    return(
        <Grid>
            <Grid.Column width='10'>
            <List>
                {activities.map(activty => {
                    return (
                    <List.Item key={activty.id}>
                        {activty.title}
                    </List.Item>
                    )
                })}
            </List>
            </Grid.Column>
        </Grid>
    )
}