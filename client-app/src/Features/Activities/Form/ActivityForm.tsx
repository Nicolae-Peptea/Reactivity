import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../App/Layout/LoadingComponents";
import { useStore } from "../../../App/Stores/store";
import {v4 as uuid} from "uuid"
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../App/Common/Form/MyTextInput";
import MyTextArea from "../../../App/Common/Form/MyTextArea";
import MySelectInput from "../../../App/Common/Form/MySelectInput";
import { categoryOptions } from "../../../App/Common/Options/categoryOptions";
import MyDateInput from "../../../App/Common/Form/MyDateInput";
import { ActivityFormValues } from "../../../App/Models/activity";

export default observer (function ActivityForm() {

    const history = useHistory();
    const {activityStore} = useStore();
    const{createActivity, updateActivity,
            loadActivity, loadingInitial, setLoadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();
    const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required("The activity title is required"),
        description: Yup.string().required("The activity description is required"),
        category: Yup.string().required(),
        date: Yup.string().required("Date is required").nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required(),

    })
    
    useEffect(() => {
        if (id) {
            loadActivity(id)
            .then(activity => setActivity(new ActivityFormValues(activity)));
        } else {
            setLoadingInitial(false);
        }
    }, [id, loadActivity, setLoadingInitial])

    function handleFormSubmit(activity: ActivityFormValues) {
        if (!activity.id) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
        } else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
        }
    }

    if (loadingInitial) {
        return <LoadingComponent content={"Loading activity...."} />
    }

    return (
        <Segment clearing>
            <Header content='Activity Details ' sub color="teal" />
            <Formik
            validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}>
                {({handleSubmit, isValid, isSubmitting, dirty}) => {
                    return(
                     <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                        <MyTextInput placeholder="Tile" name="title"></MyTextInput>
                        <MyTextArea rows={3} placeholder="Description" name='description'></MyTextArea>
                        <MySelectInput options={categoryOptions} placeholder="Category" name='category'></MySelectInput>
                        <MyDateInput
                            placeholderText="Date"
                            name='date'
                            showTimeSelect
                            timeCaption="time"
                            dateFormat= "MMMM d, yyyy h:mm aa"
                        />
                        <Header content='Loacation Details ' sub color="teal" />
                        <MyTextInput placeholder="City" name='city'></MyTextInput>
                        <MyTextInput placeholder="Venue" name='venue'></MyTextInput>
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting}
                            floated="right"
                            positive type="submit"
                            content="Submit" 
                        />
                        <Button as={Link} to={"/activities"} floated="right" type="submit" content="Cancel" />
                    </Form>
                    )
                }}
            </Formik>
        </Segment>
    )
})