import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Image, List, Popup } from "semantic-ui-react";
import { Profile } from "../../../App/Models/profile";
import ProfileCard from "../../Profiles/ProfileCard";

interface Props {
    attendees: Profile[];
}

export default observer (function ActivityListItemAttendee({attendees}: Props) {
    return (
        <List horizontal>
            {attendees.map(attendee => {
                return (
                    <Popup
                        hoverable
                        key={attendee.username}
                        trigger={
                            <List.Item key={attendee.username} as={Link} to={`/profiles/${attendee.username}`}>
                                <Image size="mini" circular src={attendee.image || '/assets/user.png'}/>
                            </List.Item>
                        }
                    >
                        <Popup.Content>
                            <ProfileCard profile={attendee}/>
                        </Popup.Content>

                    </Popup>
                   
                )
            })}
        </List>
    )
})