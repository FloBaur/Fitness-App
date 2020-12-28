import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

/////////////////////Navigation
import NAV_Container from "./navigation/NAV_Container";
/////////////////////Navigation

/////////////////////Store
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import RED_WorkOuts from "./Store/reducers/RED_WorkOuts";
import RED_Authentication from "./Store/reducers/RED_Authentication";

const rootReducer = combineReducers({
  workouts: RED_WorkOuts,
  auth: RED_Authentication,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
/////////////////////Store

/////////////////////Fonts
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font'; //font

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};
// /////////////////////Fonts


export default function App() {
  /////////////////////Fonts
    const [dataLoaded, setDataLoaded] = useState(false);

    if (!dataLoaded){
        return <AppLoading startAsync={fetchFonts}
                           onFinish={() => setDataLoaded(true)}
                           onError={(err) => console.log(err)}
        />;
    }
  /////////////////////Fonts

  return (
    <Provider store={store}>
      <NAV_Container/>
    </Provider>
  );
}

const styles = StyleSheet.create({
});
