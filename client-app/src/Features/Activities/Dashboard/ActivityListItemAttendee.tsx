import { observer } from "mobx-react-lite";
import React from "react";
import { Image, List } from "semantic-ui-react";

export default observer (function ActivityListItemAttendee() {
    return (
        <List horizontal>
            <List.Item>
                <Image size="mini" circular src='/assets/user.png'/>
            </List.Item>
            <List.Item>
                <Image size="mini" circular src='/assets/user.png'/>
            </List.Item>
            <List.Item>
                <Image size="mini" circular src='/assets/user.png'/>
            </List.Item>
        </List>
    )
})