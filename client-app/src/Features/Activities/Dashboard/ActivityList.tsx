import { observer } from "mobx-react-lite";
import React from "react";
import {Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../App/Stores/store";
import ActivityListItems from "./ActivityListItems";

export default observer (function ActivityList() {
    const {activityStore} = useStore();
    const { activityByDate} = activityStore;
    return (
        <Segment>
            <Item.Group divided>
                {activityByDate.map((activity) => {
                    return(
                        <ActivityListItems key={activity.id} activity={activity}/>
                    )
                })}
            </Item.Group>
        </Segment>
    )
})