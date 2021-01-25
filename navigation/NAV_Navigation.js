import React from "react";
import { Platform, View, SafeAreaView, Button, Text } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

/// Static stuff
import CONST_Colors from "../components/constants/CONST_Colors";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
/// Static stuff

import SCREEN_Home, {
  screenOptions as homeScreenOptions,
} from "../Screens/SCREEN_Home";
import SCREEN_AddWorkout, {
  screenOptions as addWorkoutOptions,
} from "../Screens/SCREEN_AddWorkout";
import SCREEN_AddExercise, {
  screenOptions as addExerciseOptions,
} from "../Screens/SCREEN_AddExercise";

import SCREEN_Exercises, {
  screenOptions as exercisesOptions,
} from "../Screens/SCREEN_Exercises";

import SCREEN_ExerciseDetails, {
  screenOptions as exercisesDetailOptions,
} from "../Screens/SCREEN_ExerciseDetails";

import SCREEN_WorkoutBasket, {
  screenOptions as workoutBasketDetailOptions,
} from "../Screens/SCREEN_WorkoutBasket";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? CONST_Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : CONST_Colors.primary,
};

const WorkoutStackNavigator = createStackNavigator();
const ExerciseStackNavigator = createStackNavigator();
const NavigationDrawer = createDrawerNavigator();

const WorkoutNavigator = () => {
  return (
    <WorkoutStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <WorkoutStackNavigator.Screen
        name="Home Screen"
        component={SCREEN_Home}
        options={homeScreenOptions}
      />
      <WorkoutStackNavigator.Screen
        name="AddWorkout"
        component={SCREEN_AddWorkout}
        options={addWorkoutOptions}
      />
      <WorkoutStackNavigator.Screen
        name="WorkoutBasket"
        component={SCREEN_WorkoutBasket}
        options={workoutBasketDetailOptions}
      />
    </WorkoutStackNavigator.Navigator>
  );
};

const ExerciseNavigator = () => {
  return (
    <ExerciseStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ExerciseStackNavigator.Screen
        name="Exercises"
        component={SCREEN_Exercises}
        options={exercisesOptions}
      />
      <ExerciseStackNavigator.Screen
        name="AddExercise"
        component={SCREEN_AddExercise}
        options={addExerciseOptions}
      />
      <ExerciseStackNavigator.Screen
        name="ExerciseDetail"
        component={SCREEN_ExerciseDetails}
        options={exercisesDetailOptions}
      />
    </ExerciseStackNavigator.Navigator>
  );
};

export const ShopNavigator = () => {
  const dispatch = useDispatch();

  return (
    <NavigationDrawer.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 70 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                color={CONST_Colors.primary}
                onPress={() => {}}
              />
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: CONST_Colors.primary,
      }}
    >
      <NavigationDrawer.Screen
        name="Workouts"
        component={WorkoutNavigator}
        options={{
          drawerIcon: (props) => (
            <FontAwesome5 name="running" size={24} color="black" />
          ),
        }}
      />
      <NavigationDrawer.Screen
        name="Exercises"
        component={ExerciseNavigator}
        options={{
          drawerIcon: (props) => (
            <MaterialIcons name="fitness-center" size={24} color="black" />
          ),
        }}
      />
    </NavigationDrawer.Navigator>
  );
};
