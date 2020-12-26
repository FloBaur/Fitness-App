import React from 'react'

import {useSelector} from "react-redux";
import {NavigationContainer} from '@react-navigation/native'
import {WorkoutNavigator} from "./NAV_Navigation";

const NAV_Container = props => {
    // const isAuthenticated = useSelector(state => !!state.auth.token)

    return (
    <NavigationContainer>
        <WorkoutNavigator/>
    </NavigationContainer>)
};

export default NAV_Container;