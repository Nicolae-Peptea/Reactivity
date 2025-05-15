import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";
import { useStore } from "../../../App/Stores/store";
import { Value } from "react-calendar/dist/cjs/shared/types";

export default observer (function ActivityFilters() {
    const {activityStore: {predicate, setPredicate}} = useStore();

    const handleDateChange = (value: Value) => {
        if (value instanceof Date) {
            setPredicate('startDate', value);
        }
    };

    return (
        <Fragment>
            <Menu vertical size='large' style={{width: '100%', marginTop: 25}}>
                <Header icon='filter' attached color='teal' content='Filters'/>
                <Menu.Item
                    content="All Activities"
                    active={predicate.has('all')}
                    onClick={() => setPredicate('all', 'true')} 
                />
                <Menu.Item 
                    content="I'm going"
                    active={predicate.has('isGoing')}
                    onClick={() => setPredicate('isGoing', 'true')} 
                />
                <Menu.Item
                    content="I'm hosting"
                    active={predicate.has('isHost')}
                    onClick={() => setPredicate('isHost', 'true')} 
                />
            </Menu>
            <Header />
            <Calendar
                onChange={handleDateChange}
                value={predicate.get('startDate') || new Date()}
            />
        </Fragment>
    )
})