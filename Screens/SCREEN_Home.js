import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  Platform,
  FlatList,
  Image,
  Alert,
} from "react-native";
import C_HeaderButtons from "../components/C_HeaderButtons";
import C_Workout from "../components/C_Workout";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import CONST_normalText from "../components/constants/CONST_normalText";
import CONST_boldText from "../components/constants/CONST_boldText";
import CONST_Colors from "../components/constants/CONST_Colors";
import CONST_defaultPic from "../components/constants/CONST_defaultPic";
import { deleteWorkout } from "../Store/actions/ACTION_Exercises";
import * as exercisesActions from "../Store/actions/ACTION_Exercises";
import * as actions from "../Store/actions/ACTION_Exercises";

const SCREEN_Home = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(exercisesActions.loadWorkouts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(exercisesActions.loadExercises());
  }, [dispatch]);

  // -------------Navigation

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={C_HeaderButtons}>
          <Item
            iconName={
              Platform.OS === "android" ? "md-add-circle" : "ios-add-circle"
            }
            onPress={() => props.navigation.navigate("AddWorkout", {})}
          />
        </HeaderButtons>
      ),
    });
  });
  // -------------Navigation

  const workouts = useSelector((state) => state.exercises.workouts);

  const [workoutId, setWorkoutId] = useState(null);
  const [workoutDetails, setWorkoutDetails] = useState(null);
  const [showMode, setShowMode] = useState(false);
  const [height, setHeight] = useState(80);

  const calculateHeight = (numOfWorkouts) => {
    return numOfWorkouts * 70 + 180;
  };

  const showDetailsHandler = (workoutID) => {
    setWorkoutId(workoutID);
    const workout = workouts.find((workout) => workout.id === workoutID);
    let workoutDetail = null;
    const deleteWorkoutHandler = (workoutId, workoutTitle) => {
      Alert.alert(
        "Watch out!",
        `You will now delete ${workoutTitle}. Are you sure?`,
        [
          {
            text: "Cancel",
            onPress: () => {
              return null;
            },
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              dispatch(deleteWorkout(workoutId));
            },
          },
        ],
        { cancelable: false }
      );
    };

    if (workout) {
      workoutDetail = (
        <View style={styles.workoutDetails}>
          <CONST_normalText ownStyle={{ marginVertical: 5 }}>
            {workout.description}
          </CONST_normalText>
          <CONST_boldText>Your exercises:</CONST_boldText>
          {workout.exercises.map((exercise) => (
            <View key={Math.random()} style={styles.items}>
              <Image
                source={
                  exercise.imageUri === "defaultPicture"
                    ? CONST_defaultPic
                    : { uri: exercise.imageUri }
                }
                style={styles.image}
              />
              <View style={{ width: "35%" }}>
                <CONST_normalText>{exercise.title}</CONST_normalText>
              </View>
              <View style={{ width: "15%" }}>
                <CONST_boldText>
                  {exercise.sets} {exercise.sets.length === 1 ? "set" : "sets"}
                </CONST_boldText>
              </View>
            </View>
          ))}

          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.btn}>
              <Button
                title="DELETE"
                onPress={() => deleteWorkoutHandler(workout.id, workout.title)}
                color="grey"
              />
            </View>
            <View style={styles.btn}>
              <Button title="EDIT" onPress={() => {}} color="grey" />
            </View>
          </View>
        </View>
      );
    } else {
      workoutDetail = null;
    }

    setWorkoutDetails(workoutDetail);
    setShowMode(true);

    const numOfExercises = workout.exercises.length;
    setHeight(calculateHeight(numOfExercises));
  };
  const startWorkoutHandler = (workoutId, workoutTitle, CatId) => {
    Alert.alert(
      "Ready for start?",
      `You will start ${workoutTitle} now`,
      [
        {
          text: "Cancel",
          onPress: () => {
            return null;
          },
          style: "cancel",
        },
        {
          text: "Let's go!",
          onPress: () => {
            props.navigation.navigate("StartWorkout", {
              workoutId: workoutId,
              workoutTitle: workoutTitle,
              workoutCatID: CatId,
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const hideDetailsHandler = () => {
    setWorkoutId(null);
    setHeight(50);
    setShowMode(false);
  };

  const renderWorkouts = (workouts) => {
    if (workouts.item.id === workoutId) {
      return (
        <C_Workout
          workoutData={workouts.item}
          extraData={workoutDetails}
          onDetail={(workoutId) => showDetailsHandler(workoutId)}
          onStart={(workoutId, workoutTitle, workoutCategoryNumber) =>
            startWorkoutHandler(workoutId, workoutTitle, workoutCategoryNumber)
          }
          onHide={hideDetailsHandler}
          show={showMode}
          height={height}
        />
      );
    } else {
      return (
        <C_Workout
          workoutData={workouts.item}
          extraData={null}
          onDetail={(workoutId) => showDetailsHandler(workoutId)}
          onStart={(workoutId, workoutTitle, workoutCategoryNumber) =>
            startWorkoutHandler(workoutId, workoutTitle, workoutCategoryNumber)
          }
          onHide={() => hideDetailsHandler}
          show={showMode}
        />
      );
    }
  };

  if (workouts && workouts.length === 0) {
    return (
      <View style={styles.screen}>
        <CONST_normalText>Start adding your first workout!</CONST_normalText>
        <CONST_normalText>
          Tab on the + plus button to create one
        </CONST_normalText>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={workouts}
        renderItem={renderWorkouts}
        numColumns={1}
        style={{ width: "100%" }}
      />
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "My Workouts",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={C_HeaderButtons}>
        <Item
          title="Add Workout"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
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
  header: {
    marginHorizontal: 30,
    padding: 10,
  },
  btn: {
    width: 100,
    marginHorizontal: 20,
  },
  image: {
    width: 50,
    height: "100%",
  },
  items: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 5,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    height: 50,
  },

  itemName: {
    marginVertical: 10,
    marginHorizontal: 15,
    borderColor: CONST_Colors.primary,
    borderWidth: 1,
    padding: 10,
    flexDirection: "row",
    marginLeft: 10,
    alignItems: "center",
    width: 180,
    justifyContent: "space-between",
  },
  workoutDetails: {
    width: "100%",
    marginTop: 10,
  },
});

export default SCREEN_Home;
