import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound() {
    return(
        <Segment placeholder>
            <Header icon>
                <Icon name="search" />
                Oops - we've looked everywhere and could not dind this.
            </Header>
            <Segment.Inline>
                <Button as={Link} to={`/activities`} content="Return to activities page"/>
            </Segment.Inline>
        </Segment>
    )
}