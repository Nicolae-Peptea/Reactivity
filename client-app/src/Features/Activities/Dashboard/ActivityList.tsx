import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import {Header } from "semantic-ui-react";
import { useStore } from "../../../App/Stores/store";
import ActivityListItems from "./ActivityListItems";

export default observer (function ActivityList() {
    const {activityStore} = useStore();
    const { groupedActivities} = activityStore;

    return (
        <Fragment>
            {groupedActivities.map(([group, activities]) => (  
                <Fragment key={group}>
                    <Header sub color="teal">
                        {group}
                    </Header>
                        {activities.map((activity) => {
                            return(
                                <ActivityListItems key={activity.id} activity={activity}/>
                            )
                        })}
                </Fragment>
            ))}
        </Fragment>
    )
})