import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";
import { Profile } from "../../App/Models/profile";
import { useStore } from "../../App/Stores/store";


interface Props {
    profile: Profile;
}

export default observer (function ProfilePhotos({profile}: Props) {
    const {profileStore: {isCurrentUser}} = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated="left" icon='image' content='Photos'/>
                    {isCurrentUser && (
                        <Button
                            floated="right"
                            basic
                            content={addPhotoMode ? "Cancel" : "Add Photo"}
                            onClick={() => setAddPhotoMode(!addPhotoMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode ? (
                        <p>Photo widget goes here</p>
                    ) : (
                        <Card.Group itemsPerRow={5}>
                            {profile.photos?.map(photo => (
                                <Card key={photo.id}>
                                    <Image src={photo.url} />
                                </Card>
                            ))}
                        </Card.Group>
                    )}
                </Grid.Column>
            </Grid>
           
          
        </Tab.Pane>
    )
})