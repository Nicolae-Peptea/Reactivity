import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";

export default function HomePage(){
    return (
        <Fragment>
            <Segment inverted textAlign='center' vertical className='masthead'>
                <Container text>
                    <Header as='h1' inverted>
                        <Image size='massive' src='assets/logo.png' alt='logo' style={{marginBottom: 12}}/>
                        Reactivities
                    </Header>
                    <Header as='h2' inverted content='Welcome to Reactivities'/>
                    <Button as={Link} to='/activities' size='huge' inverted content='Take me to Activities'/>
                </Container>
            </Segment>
        </Fragment>
    )
}