import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Label } from "semantic-ui-react";
import Activity from "../../../App/Models/activity";
import { useStore } from "../../../App/Stores/store";

interface Props {
    activity: Activity
}

export default function ActivityListItems({activity} : Props) {

    const {activityStore} = useStore();
    const {deleteActivity, loading} = activityStore;
    const [target, setTarget] = useState('');

    function handleActivityDelete(ev: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(ev.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <Item key={activity.id}>
        <Item.Content>
            <Item.Header as="a">{activity.title}</Item.Header>
            <Item.Meta>{activity.date}</Item.Meta>
            <Item.Description>
                <div>{activity.description}</div>
                <div>{activity.city}, {activity.venue}</div>
            </Item.Description>
            <Item.Extra>
                <Button 
                    as={Link} to={`/activities/${activity.id}`}
                    floated="right"
                    content="View"
                    color="blue"
                />
                <Button
                    name={activity.id}
                    loading={loading && target === activity.id}
                    onClick={(ev) => handleActivityDelete(ev, activity.id)}
                    floated="right"
                    content="Delete"
                    color="red"
                />
                <Label basic content={activity.category} />
            </Item.Extra>
        </Item.Content>
    </Item>
    )
}