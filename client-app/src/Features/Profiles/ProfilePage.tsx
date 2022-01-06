import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../App/Layout/LoadingComponents";
import { useStore } from "../../App/Stores/store";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";

export default observer (function ProfilePage() {
    const {username} = useParams<{username: string}>();
    const {profileStore} = useStore();
    const {loadProfile, loadingProfile, profile} = profileStore;

    useEffect(() => {
        loadProfile(username);
    }, [loadProfile, username])

    if (loadingProfile) {
        return <LoadingComponent content="Loading profile..." />
    }

    return (
        <Grid>
            <Grid.Column width={16}>
                {profile &&
                <ProfileHeader profile={profile} />}
                <ProfileContent />
            </Grid.Column>
        </Grid>
    )
})