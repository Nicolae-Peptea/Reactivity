import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import Activty from "../../../App/Models/activity";

interface Props {
    activities: Activty[]
}

export default function ActivityList({activities}: Props) {
    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => {
                    return(
                        <Item>
                        <Item.Content>
                            <Item.Header as="a">{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated="right" content="View" color="blue" />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                    )
                })}
            </Item.Group>
        </Segment>
    )
}