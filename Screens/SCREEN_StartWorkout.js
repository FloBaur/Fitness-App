import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Alert,
  FlatList,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import C_HeaderButtons from "../components/C_HeaderButtons";
import { useSelector, useDispatch } from "react-redux";
import C_StartWorkoutExercise from "../components/C_StartWorkoutExercise";
import CONST_boldText from "../components/constants/CONST_boldText";
import * as exercisesActions from "../Store/actions/ACTION_Exercises";
import * as statisticActions from "../Store/actions/ACTION_Statistics";
import MODEL_HistoryWorkout from "../components/models/MODEL_HistoryWorkout";

const SCREEN_StartWorkout = (props) => {
  const dispatch = useDispatch();
  const chosenWorkout = useSelector((state) =>
    state.exercises.workouts.find(
      (workout) => workout.id === props.route.params.workoutId
    )
  );

  const myCurrentWorkout = useSelector(
    (state) => state.exercises.currentWorkout
  );

  if (myCurrentWorkout.length === chosenWorkout.exercises.length) {
    const historyWorkout = new MODEL_HistoryWorkout(
      Math.floor(Math.random() * 1000),
      props.route.params.workoutTitle,
      new Date(),
      props.route.params.workoutCatID,
      myCurrentWorkout
    );

    Alert.alert(
      "Finish!!!",
      `You successfully finished your workout`,
      [
        {
          text: "Nice",
          onPress: () => {
            dispatch(exercisesActions.resetCurrentWorkout());
            dispatch(statisticActions.addWorkoutToHistory(historyWorkout));
            props.navigation.navigate("Home Screen");
          },
        },
      ],
      { cancelable: false }
    );
  }

  const onPressExerciseHandler = (exerciseId, exerciseTitle, index) => {
    props.navigation.navigate("StartWorkoutExercises", {
      exerciseId: exerciseId,
      currentId: index,
      workoutTitle: exerciseTitle,
    });
  };

  let doneWorkoutIds = [];
  myCurrentWorkout.map((workout) => doneWorkoutIds.push(workout.currentId));

  return (
    <View style={styles.screen}>
      <View style={{ marginTop: 10 }}>
        <CONST_boldText>
          You have done {myCurrentWorkout.length} of{" "}
          {chosenWorkout.exercises.length} exercises
        </CONST_boldText>
      </View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={chosenWorkout.exercises}
        renderItem={(item, index) => {
          return (
            <C_StartWorkoutExercise
              itemData={chosenWorkout.exercises[item.index]}
              currentExId={item.index}
              onPressExercise={(exerciseId, exerciseTitle, currentExId) =>
                onPressExerciseHandler(exerciseId, exerciseTitle, currentExId)
              }
              doneWorkoutIds={doneWorkoutIds}
            />
          );
        }}
        numColumns={2}
      />
    </View>
  );
};

export const screenOptions = (navData) => {
  const workoutTitle = navData.route.params.workoutTitle;
  const dispatch = useDispatch();

  return {
    headerTitle: workoutTitle,
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={C_HeaderButtons}>
        <Item
          title="Drawer"
          iconName={
            Platform.OS === "android"
              ? "md-close-circle-outline"
              : "ios-close-circle-outlinee"
          }
          onPress={() => {
            Alert.alert(
              "Break up?",
              `Do you really want to break up your workout?`,
              [
                {
                  text: "Cancel",
                  onPress: () => {
                    return null;
                  },
                  style: "cancel",
                },
                {
                  text: "Yes please!",
                  onPress: () => {
                    dispatch(exercisesActions.resetCurrentWorkout());
                    navData.navigation.goBack();
                  },
                },
              ],
              { cancelable: false }
            );
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SCREEN_StartWorkout;
