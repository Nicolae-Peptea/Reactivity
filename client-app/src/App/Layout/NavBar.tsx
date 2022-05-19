import { observer } from "mobx-react-lite";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Menu, Image, Dropdown, DropdownMenu } from "semantic-ui-react";
import { useStore } from "../Stores/store";

export default observer (function NavBar(){
    const {userStore: {user, logout, isLoggedIn}} = useStore();
    return(
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: 10}}/>
                    Reactivties
                </Menu.Item>
                {isLoggedIn &&
                <>
                    <Menu.Item as={NavLink} to="/activities" name="Activites"/>
                    <Menu.Item as={NavLink} to="/errors" name="Errors"/>
                    <Menu.Item>
                        <Button as={NavLink} to="/createActivity" positive content="Create activity"/>
                    </Menu.Item>
                    <Menu.Item position="right">
                        <Image src={user?.image || "/assets/user.png"} avatar spaced='right'/>
                        <Dropdown pointing="top left" text={user?.displayName}>
                            <DropdownMenu>
                                <Dropdown.Item as={Link} to={`/profiles/${user?.username}`} text="My Profile" icon="user"/>
                                <Dropdown.Item onClick={logout} text="Logout" icon="power"/>
                            </DropdownMenu>
                        </Dropdown>
                    </Menu.Item>
                </>}
               
            </Container>
        </Menu>
    )
})