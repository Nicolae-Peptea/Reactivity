import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../../App/Stores/store";
import * as Yup from 'yup';
import { Button, Form } from "semantic-ui-react";
import MyTextInput from "../../../App/Common/Form/MyTextInput";
import MyTextArea from "../../../App/Common/Form/MyTextArea";

interface Props {
    setEditMode: (editMode: boolean) => void
}

export default observer (function ProfileEditForm ({setEditMode}: Props) {
    const {profileStore: {profile, updateProfile}} = useStore();

    return(
        <Formik
            initialValues={{displayName: profile?.displayName, bio: profile?.bio}}
            validationSchema={Yup.object({
                displayName: Yup.string().required("Display name is required")
            })}
            onSubmit={values => {
                updateProfile(values).then(() => setEditMode(false));
            }}
        >
            {({handleSubmit, isSubmitting, isValid, dirty}) => (
                <Form className="ui form" onSubmit={handleSubmit}>
                    <MyTextInput placeholder="Display Name" name="displayName"/>
                    <MyTextArea rows={3} placeholder="Add yout bio" name="bio"/>
                    <Button 
                        positive
                        type='submit'
                        loading={isSubmitting}
                        content="Update profile"
                        floated="right"
                        disabled={!isValid || !dirty}
                    />
                </Form>
            )}
        </Formik>
    );
})