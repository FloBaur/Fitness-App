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
import { useSelector } from "react-redux";
import C_StartWorkoutExercise from "../components/C_StartWorkoutExercise";

const SCREEN_StartWorkout = (props) => {
  const chosenWorkout = useSelector((state) =>
    state.exercises.workouts.find(
      (workout) => workout.id === props.route.params.workoutId
    )
  );

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={C_HeaderButtons}>
          <Item
            iconName={
              Platform.OS === "android"
                ? "md-checkbox-outline"
                : "ios-checkbox-outline"
            }
            onPress={() => props.navigation.navigate("AddWorkout", {})}
          />
        </HeaderButtons>
      ),
    });
  });

  return (
    <View style={styles.screen}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={chosenWorkout.exercises}
        renderItem={(item, index) => {
          return (
            <C_StartWorkoutExercise
              itemData={chosenWorkout.exercises[item.index]}
            />
          );
        }}
        numColumns={2}
        // style={{ width: "100%" }}
      />
    </View>
  );
};

export const screenOptions = (navData) => {
  const workoutTitle = navData.route.params.workoutTitle;

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
