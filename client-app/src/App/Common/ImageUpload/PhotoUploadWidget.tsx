import React from "react";
import { Grid, Header } from "semantic-ui-react";

export default function PhotoUploadWidget() {
    return(
        <Grid>
            <Grid.Column width={4}>
                <Header color="teal" content='Step 1 - Add Photo' />
            </Grid.Column>
            <Grid.Column width={1}/>
            <Grid.Column width={4}>
                <Header color="teal" content='Step 2 - Resize Image' />
            </Grid.Column>
            <Grid.Column width={1}/>
            <Grid.Column width={4}>
                <Header color="teal" content='Step 3 - Preview & Upload' />
            </Grid.Column>
        </Grid>
    )
}