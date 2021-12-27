import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../App/Stores/store";
import LoginForm from "../Users/LoginForm";
import RegisterForm from "../Users/RegisterForm";

export default observer (function HomePage(){
    const {userStore, modalStore} = useStore();
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
                        <>
                            <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted content='Login'/>
                            <Button onClick={() => modalStore.openModal(<RegisterForm />)} size='huge' inverted content='Register'/>
                        </>
                    )}
                    
                  
                </Container>
            </Segment>
        </Fragment>
    )
})