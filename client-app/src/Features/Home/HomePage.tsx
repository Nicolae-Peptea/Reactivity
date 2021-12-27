import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../App/Stores/store";

export default observer (function HomePage(){
    const {userStore} = useStore();
    return (
        <Fragment>
            <Segment inverted textAlign='center' vertical className='masthead'>
                <Container text>
                    <Header as='h1' inverted>
                        <Image size='massive' src='assets/logo.png' alt='logo' style={{marginBottom: 12}}/>
                        Reactivities
                    </Header>
                    {userStore.isLoggedIn ? (
                        <>
                            <Header as='h2' inverted content='Welcome to Reactivities'/>
                            <Button as={Link} to='/activities' size='huge' inverted content='Go to activites'/>
                        </>
                    ): (
                        <Button as={Link} to='/login' size='huge' inverted content='Login'/>
                    )}
                    
                  
                </Container>
            </Segment>
        </Fragment>
    )
})