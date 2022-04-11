import React, { Fragment, useEffect } from 'react';
import {Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../Features/Activities/Dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router';
import HomePage from '../../Features/Home/HomePage';
import ActivityForm from '../../Features/Activities/Form/ActivityForm';
import ActivityDetails from '../../Features/Activities/Details/ActivityDetails';
import TestErrors from '../../Features/Errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../Features/Errors/NotFound';
import ServerError from '../../Features/Errors/ServerError';
import { useStore } from '../Stores/store';
import LoadingComponent from './LoadingComponents';
import ModalContainer from '../Common/Modals/ModalContainer';
import ProfilePage from '../../Features/Profiles/ProfilePage';
import PrivateRoute from './PrivateRoute';

function App() {

  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) {
    return <LoadingComponent content='Loading App...'></LoadingComponent>
  }

  return (
    <Fragment>
      <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer />
       <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{marginTop: "7em"}}>
              <Switch>
                <PrivateRoute exact path="/activities" component={ActivityDashboard} />
                <PrivateRoute path="/activities/:id" component={ActivityDetails} />
                <PrivateRoute key={location.key} path={["/createActivity", "/manage/:id"]} component={ActivityForm} />
                <PrivateRoute path='/profiles/:username' component={ProfilePage} />
                <PrivateRoute path='/errors' component={TestErrors} />
                <Route path='/server-error' component={ServerError} />
                <Route component={NotFound}/>
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
}

export default observer(App);