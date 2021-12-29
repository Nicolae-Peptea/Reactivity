import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Image, List } from "semantic-ui-react";
import { Profile } from "../../../App/Models/profile";

interface Props {
    attendees: Profile[];
}

export default observer (function ActivityListItemAttendee({attendees}: Props) {
    return (
        <List horizontal>
            {attendees.map(attendee => {
                return (
                    <List.Item key={attendee.username} as={Link} to={`/profiles/${attendee.username}`}>
                        <Image size="mini" circular src={attendee.image || '/assets/user.png'}/>
                    </List.Item>
                )
            })}
        </List>
    )
})