import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LogBox } from "react-native";

/////////////////////Navigation
import NAV_Container from "./navigation/NAV_Container";
/////////////////////Navigation

/////////////////////Store
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";

import RED_Authentication from "./Store/reducers/RED_Authentication";
import exerciseReducer from "./Store/reducers/RED_Exercises";
import {
  init,
  initSets,
  initWorkouts,
  dropTableExercises,
  dropTableSets,
  dropTableWorkouts,
} from "./Helpers/HELP_Db";

// dropTableExercises()
//   .then(() => {
//     console.log("Dropped Table");
//   })
//   .catch((err) => {
//     console.log("Drop failed " + err);
//     throw err;
//   });
//
// dropTableSets()
//   .then(() => {
//     console.log("Dropped Table");
//   })
//   .catch((err) => {
//     console.log("Drop failed " + err);
//     throw err;
//   });

init()
  .then(() => {
    console.log("Initialized DB");
  })
  .catch((err) => {
    console.log("Initializing failed " + err);
    throw err;
  });

initSets()
  .then(() => {
    console.log("Initialized Sets");
  })
  .catch((err) => {
    console.log("Initializing failed " + err);
    throw err;
  });

initWorkouts()
  .then(() => {
    console.log("Initialized Workouts");
  })
  .catch((err) => {
    console.log("Initializing failed " + err);
    throw err;
  });

const rootReducer = combineReducers({
  exercises: exerciseReducer,
  auth: RED_Authentication,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
/////////////////////Store

/////////////////////Fonts
import AppLoading from "expo-app-loading";
import * as Font from "expo-font"; //font

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};
// /////////////////////Fonts

export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);
  useEffect(() => {
    LogBox.ignoreLogs([
      "Cannot update a component from inside the function body of a different component",
    ]);
  }, []);
  /////////////////////Fonts
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  /////////////////////Fonts

  return (
    <Provider store={store}>
      <NAV_Container />
    </Provider>
  );
}

const styles = StyleSheet.create({});
