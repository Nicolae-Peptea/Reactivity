import React, { Fragment } from 'react';
import {Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../Features/Activities/Dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router';
import HomePage from '../../Features/Home/HomePage';
import ActivityForm from '../../Features/Activities/Form/ActivityForm';
import ActivityDetails from '../../Features/Activities/Details/ActivityDetails';
import TestErrors from '../../Features/Errors/TestError';

function App() {

  const location = useLocation();

  return (
    <Fragment>
       <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{marginTop: "7em"}}>
              <Route exact path="/activities" component={ActivityDashboard} />
              <Route path="/activities/:id" component={ActivityDetails} />
              <Route key={location.key} path={["/createActivity", "/manage/:id"]} component={ActivityForm} />
              <Route path='/errors' component={TestErrors} />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
}

export default observer(App);
