import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../Stores/store";


export default function NavBar(){

    const {activityStore} = useStore();

    return(
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: 10}}/>
                    Reactivties
                </Menu.Item>
                <Menu.Item name="Activites"/>
                <Menu.Item>
                    <Button onClick={() => activityStore.openForm()} positive content="Create activity"/>
                </Menu.Item>
            </Container>

        </Menu>
    )
}