import React from 'react';
import {
    Platform,
} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack'
// import {createDrawerNavigator} from '@react-navigation/drawer'

/// Static stuff
import CONST_Colors from "../components/constants/CONST_Colors";
// import { Ionicons } from '@expo/vector-icons';
/// Static stuff

import SCREEN_Home, {screenOptions} from "../Screens/SCREEN_Home";


const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? CONST_Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : CONST_Colors.primary
};

const WorkoutStackNavigator = createStackNavigator();
export const WorkoutNavigator = () => {

    return <WorkoutStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <WorkoutStackNavigator.Screen
            name='Home Screen'
            component={SCREEN_Home}
            options={screenOptions}/>
    </WorkoutStackNavigator.Navigator>
}
