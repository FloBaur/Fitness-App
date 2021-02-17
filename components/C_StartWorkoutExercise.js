import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import CONST_normalText from "./constants/CONST_normalText";
import CONST_boldText from "./constants/CONST_boldText";
import CONST_Colors from "./constants/CONST_Colors";
import icon from "../assets/Dumbells-gym-fitness-workout-icon-by-Hoeda80.jpeg";

const C_StartWorkoutExercise = (props) => {
  let done = false;

  props.doneWorkoutIds.map((wId) => {
    if (props.currentExId === wId) {
      done = true;
    }
  });

  console.log(props.currentExId);

  return (
    <View style={done ? styles.gridItemDone : styles.gridItem}>
      <TouchableOpacity
        disabled={done}
        onPress={() =>
          props.onPressExercise(
            props.itemData.id,
            props.itemData.title,
            props.currentExId
          )
        }
      >
        <View>
          <View style={{ ...styles.productHeader }}>
            <ImageBackground
              source={
                !props.itemData.imageUri ||
                props.itemData.imageUri === "defaultPicture"
                  ? icon
                  : { uri: props.itemData.imageUri }
              }
              style={styles.bgImage}
            >
              <CONST_boldText ownStyle={styles.subTitle}>
                {props.itemData.sets}
              </CONST_boldText>
              <View style={done ? styles.doneWorkout : styles.titleContainer}>
                <CONST_boldText ownStyle={styles.title}>
                  {props.itemData.title}
                </CONST_boldText>
              </View>
            </ImageBackground>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    height: Dimensions.get("window").height / 5,
    width: Dimensions.get("window").height / 5,
    backgroundColor: "lightgrey",
    marginVertical: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: CONST_Colors.accent,
  },

  gridItemDone: {
    height: Dimensions.get("window").height / 5,
    width: Dimensions.get("window").height / 5,
    backgroundColor: "lightgrey",
    marginVertical: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    opacity: 0.3,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: CONST_Colors.primary,
  },
  titleContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 5,
    paddingHorizontal: 12,
  },

  doneWorkout: {
    backgroundColor: CONST_Colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },

  title: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },

  subTitle: {
    fontSize: 18,
    color: CONST_Colors.primary,
    marginLeft: "86%",
    marginBottom: "58%",
  },

  productHeader: {
    height: "100%",
  },

  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
});

export default C_StartWorkoutExercise;
