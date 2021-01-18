import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  ScrollView,
  Alert,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import C_ExerciseList from "../components/C_ExerciseList";
import CONST_Colors from "../components/constants/CONST_Colors";
import CONST_normalText from "../components/constants/CONST_normalText";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import C_HeaderButtons from "../components/C_HeaderButtons";
import { addExerciseToBasket } from "../Store/actions/ACTION_Exercises";

const SCREEN_AddWorkout = (props) => {
  const allExercises = useSelector((state) => state.exercises.allExercises);
  const dispatch = useDispatch();

  const addExerciseToWorkoutHandler = (exercise) => {
    dispatch(addExerciseToBasket(exercise.id));
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={C_HeaderButtons}>
          <Item
            iconName={Platform.OS === "android" ? "logo-buffer" : "ios-photos"}
            onPress={() => {
              props.navigation.navigate("WorkoutBasket", {});
            }}
          />
        </HeaderButtons>
      ),
    });
  });

  const viewDetailsHandler = (id, title) => {
    props.navigation.navigate("ExerciseDetail", {
      exerciseId: id,
      exerciseTitle: title,
      editingMode: false,
      workOutMode: true,
    });
  };

  const renderGridItem = (itemData) => {
    return (
      <C_ExerciseList
        itemData={itemData}
        onAddExerciseToWorkout={(id) => addExerciseToWorkoutHandler(id)}
        onSelectDetail={(id, title) => viewDetailsHandler(id, title)}
        workoutMode={true}
      />
    );
  };

  if (allExercises.length === 0) {
    return (
      <View style={styles.screen}>
        <Text>You don't have any exercises. Maybe add one :)!</Text>
        <View style={styles.deadScreenBtn}>
          <Button
            title="Add exercise"
            onPress={() => {
              props.navigation.navigate("Exercises");
            }}
            color={CONST_Colors.primary}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.list}>
      <CONST_normalText ownStyle={{ marginTop: 10 }}>
        Just tab exercises to add it to your workout :)
      </CONST_normalText>
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
  return {
    headerTitle: "New workout",
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  deadScreenBtn: {
    margin: 10,
  },
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 35,
  },
});

export default SCREEN_AddWorkout;
