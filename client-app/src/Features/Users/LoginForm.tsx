import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../App/Common/Form/MyTextInput";
import { useStore } from "../../App/Stores/store";
import * as Yup from "yup";

export default observer (function LoginForm(){
    const {userStore} = useStore();
    return(
        <Formik
            initialValues={{email: "", password: "", error: null}}
            
            onSubmit={(values, {setErrors}) => userStore.login(values).catch(error =>
                setErrors({error: error.response.data}))}
            
            validationSchema={Yup.object({
                email: Yup.string().required(),
                password: Yup.string().required()
            })}
        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                    <Header as="h2" content="Login to Reactivites" color="teal" textAlign="center"/>
                    <MyTextInput name="email" placeholder="Email" />
                    <MyTextInput name="password" placeholder="Password" type="password" />
                    <ErrorMessage
                        name="error" render={() => 
                        <Label style={{marginBottom: 10}} basic color="red" content={errors.error}/>}
                    />
                    <Button
                        disabled ={!isValid || !dirty || isSubmitting}
                        loading={isSubmitting}
                        positive content="Login"
                        type="submit"
                        fluid
                    
                    />
                </Form>
            )}
        </Formik>
    )
})