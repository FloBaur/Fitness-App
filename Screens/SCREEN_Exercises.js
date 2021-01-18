import React, { useEffect } from "react";
import { View, Text, StyleSheet, Platform, FlatList } from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import * as exercisesActions from "../Store/actions/ACTION_Exercises";

import C_HeaderButtons from "../components/C_HeaderButtons";
import C_ExerciseList from "../components/C_ExerciseList";

const SCREEN_Exercises = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(exercisesActions.loadExercises());
  }, [dispatch]);

  // -------------Navigation
  const navToAddProdHandler = () => {
    props.navigation.navigate("AddExercise", {});
  };

  const allExercises = useSelector((state) => state.exercises.allExercises);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={C_HeaderButtons}>
          <Item
            iconName={
              Platform.OS === "android" ? "md-add-circle" : "ios-add-circle"
            }
            onPress={navToAddProdHandler}
          />
        </HeaderButtons>
      ),
    });
  }, [navToAddProdHandler]);
  // -------------Navigation
  const viewDetailsHandler = (id, title) => {
    props.navigation.navigate("ExerciseDetail", {
      exerciseId: id,
      exerciseTitle: title,
      editingMode: false,
    });
  };

  const editExerciseHandler = (exercise) => {
    props.navigation.navigate("AddExercise", {
      exerciseId: exercise.id,
      exerciseTitle: exercise.title,
      exerciseImage: exercise.image,
      exerciseSets: exercise.sets,
      presets: exercise.exercises,
      editingMode: true,
    });
  };

  const renderGridItem = (itemData) => {
    return (
      <C_ExerciseList
        itemData={itemData}
        onSelectDetail={(id, title) => viewDetailsHandler(id, title)}
        onEditExercise={(exercise) => editExerciseHandler(exercise)}
      />
    );
  };

  if (allExercises.length === 0) {
    return (
      <View style={styles.screen}>
        <Text>You don't have any exercises!</Text>
        <Text>Maybe add one by clicking on the + Button</Text>
      </View>
    );
  }

  return (
    <View style={styles.list}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={allExercises}
        renderItem={renderGridItem}
        numColumns={1}
      />
    </View>
  );
};

export const screenOptions = (navData) => {
  // const navToAddProdFN = navData.route.params ? navData.route.params.navToAddProd : null

  return {
    headerTitle: "Your exercises",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={C_HeaderButtons}>
        <Item
          title="Add exercise"
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
    padding: 40,
  },
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 35,
  },
});

export default SCREEN_Exercises;
