import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Button,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  Text,
  Platform,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import CONST_boldText from "../components/constants/CONST_boldText";
import CONST_normalText from "../components/constants/CONST_normalText";
import CONST_Colors from "../components/constants/CONST_Colors";
import icon from "../assets/Dumbells-gym-fitness-workout-icon-by-Hoeda80.jpeg";
import C_SetsList from "../components/C_SetsList";
import * as actions from "../Store/actions/ACTION_Exercises";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import C_HeaderButtons from "../components/C_HeaderButtons";

const SCREEN_ExerciseDetails = (props) => {
  const exerciseId = props.route.params.exerciseId;
  const chosenExercise = useSelector((state) =>
    state.exercises.allExercises.find((exercise) => exercise.id === exerciseId)
  );
  const dispatch = useDispatch();

  if (!props.route.params.workOutMode) {
    const deleteHandler = (id) => {
      Alert.alert(
        "Watch out!",
        `You will now delete ${chosenExercise.title}. Are you sure?`,
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
              props.navigation.goBack();
              dispatch(actions.deleteExercise(id));
            },
          },
        ],
        { cancelable: false }
      );
    };

    useEffect(() => {
      props.navigation.setOptions({
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={C_HeaderButtons}>
            <Item
              iconName={
                Platform.OS === "android"
                  ? "md-close-circle"
                  : "ios-close-circle"
              }
              onPress={() => {
                deleteHandler(chosenExercise.id);
              }}
            />
          </HeaderButtons>
        ),
      });
    }, [deleteHandler]);
  } else {
    useEffect(() => {
      props.navigation.setOptions({
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={C_HeaderButtons}>
            <Item
              iconName={
                Platform.OS === "android" ? "md-arrow-back" : "ios-arrow-back"
              }
              onPress={() => {
                props.navigation.navigate("AddWorkout", {});
              }}
            />
          </HeaderButtons>
        ),
      });
    });
  }

  if (chosenExercise) {
    return (
      <ScrollView>
        <View style={styles.screen}>
          <Image
            source={
              !chosenExercise.imageUri ||
              chosenExercise.imageUri === "defaultPicture"
                ? icon
                : { uri: chosenExercise.imageUri }
            }
            style={styles.image}
          />
          <View style={styles.header}>
            <CONST_boldText ownStyle={{ fontSize: 28 }}>
              {chosenExercise.title}
            </CONST_boldText>
          </View>
          <View style={styles.list}>
            <FlatList
              keyExtractor={(item) => item.key}
              data={chosenExercise.exercises}
              renderItem={(item, index) => {
                return (
                  <C_SetsList
                    itemData={chosenExercise.exercises[item.index]}
                    index={chosenExercise.exercises[item.index].id}
                    show={true}
                  />
                );
              }}
              numColumns={1}
            />
          </View>
        </View>
      </ScrollView>
    );
  } else return null;
};

export const screenOptions = (navData) => {
  const exerciseTitle = navData.route.params.exerciseTitle;

  return {
    headerTitle: exerciseTitle,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  description: {
    marginHorizontal: 15,
  },

  image: {
    width: "100%",
    height: Dimensions.get("window").height / 2,
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
    marginHorizontal: 30,
    padding: 10,
  },
  button: {
    marginVertical: 20,
    paddingHorizontal: 100,
  },
});

export default SCREEN_ExerciseDetails;
