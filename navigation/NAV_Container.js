import React from 'react'

import {useSelector} from "react-redux";
import {NavigationContainer} from '@react-navigation/native'
import {ShopNavigator} from "./NAV_Navigation";

const NAV_Container = props => {
    // const isAuthenticated = useSelector(state => !!state.auth.token)

    return (
    <NavigationContainer>
        <ShopNavigator/>
    </NavigationContainer>)
};

export default NAV_Container;