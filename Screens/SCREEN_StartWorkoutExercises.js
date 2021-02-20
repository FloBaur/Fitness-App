import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Alert,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import C_HeaderButtons from "../components/C_HeaderButtons";
import * as exercisesActions from "../Store/actions/ACTION_Exercises";
import { useDispatch, useSelector } from "react-redux";
import icon from "../assets/Dumbells-gym-fitness-workout-icon-by-Hoeda80.jpeg";
import CONST_boldText from "../components/constants/CONST_boldText";
import CONST_Colors from "../components/constants/CONST_Colors";
import C_singleSetWorkout from "../components/C_singleSetWorkout";
import C_ExerciseList from "../components/C_ExerciseList";
import { addStarToStatics } from "../Store/actions/ACTION_Statistics";

let set = [];

const SCREEN_StartWorkoutExercises = (props) => {
  const dispatch = useDispatch();

  const myExercise = useSelector((state) =>
    state.exercises.allExercises.find(
      (exercise) => exercise.id === props.route.params.exerciseId
    )
  );

  useEffect(() => {
    dispatch(exercisesActions.loadExercises());
  }, [dispatch]);

  useEffect(() => {
    set = [];
  }, [dispatch]);

  const doneSetHandler = (id, reps, weight, color) => {
    const doneSet = {
      id: id,
      reps: reps,
      weight: weight,
      color: color,
    };

    if (set.length === 0) {
      set.push(doneSet);
    } else {
      const setExists = set.findIndex((set) => set.id === doneSet.id);
      if (setExists >= 0) {
        set.splice(setExists, 1);
      }
      set.push(doneSet);
    }

    if (set.length === myExercise.exercises.length) {
      Alert.alert(
        "finished?",
        `Is everything okay?`,
        [
          {
            text: "No I'd like to change something",
            onPress: () => {
              return null;
            },
            style: "cancel",
          },
          {
            text: "yeah!",
            onPress: () => {
              const doneExercise = {
                id: props.route.params.exerciseId,
                currentId: props.route.params.currentId,
                picture: myExercise.imageUri,
                title: myExercise.title,
                // presets: myExercise.exercises,
                // CatId:
                exercise: set,
              };

              set = [];
              dispatch(
                exercisesActions.addDoneExerciseToCurrentWorkout(doneExercise)
              );
              props.navigation.goBack();
            },
          },
        ],
        { cancelable: false }
      );

      if (color === "green") {
        Alert.alert("Congrats!", `You have beaten your goal`, [
          { cancelable: false },
        ]);
      }

      let green = 0;
      let red = 0;
      let same = 0;

      set.map((set) => {
        if (set.color === "green") {
          green = green + 1;
        } else if (set.color === "red") {
          red = red + 1;
        } else {
          same = same + 1;
        }
      });
      const result = Math.max(green, red, same);
      // alert(result);
    }
  };

  const renderGridItem = (itemData) => {
    return (
      <C_singleSetWorkout
        myExercise={itemData}
        onDone={(id, reps, weight, color) =>
          doneSetHandler(id, reps, weight, color)
        }
      />
    );
  };

  return (
    <ScrollView>
      <View style={styles.screen}>
        <Image
          source={
            !myExercise.imageUri || myExercise.imageUri === "defaultPicture"
              ? icon
              : { uri: myExercise.imageUri }
          }
          style={styles.image}
        />
        <View style={styles.header} />
        <View style={styles.header} />
        <View style={styles.list}>
          <FlatList
            keyExtractor={(item, index) => item.key}
            data={myExercise.exercises}
            renderItem={renderGridItem}
            numColumns={1}
            // pagingEnabled
            // horizontal
          />
        </View>
        <View style={styles.header} />
      </View>
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  const workoutTitle = navData.route.params.workoutTitle;

  return {
    headerTitle: workoutTitle,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    marginHorizontal: 15,
  },

  image: {
    width: "100%",
    height: Dimensions.get("window").height / 2.5,

    borderWidth: 1,
    borderColor: "#CCC",
  },
  itemName: {
    marginVertical: 10,
    marginHorizontal: 15,
    borderColor: CONST_Colors.primary,
    borderWidth: 1,
    padding: 10,
  },
  header: {
    padding: 10,
  },
  button: {
    marginVertical: 20,
    paddingHorizontal: 100,
  },
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

export default SCREEN_StartWorkoutExercises;
