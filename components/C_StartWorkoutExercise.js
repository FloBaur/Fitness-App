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
  console.log("Exercises");
  console.log(props.itemData.id);

  const goToDetailsHandler = (exerciseId, exerciseTitle) => {
    props.navigation.navigate("StartWorkoutExercise", {
      exerciseId: exerciseId,
      workoutTitle: exerciseTitle,
    });
  };

  return (
    <View style={styles.gridItem}>
      <TouchableOpacity
        onPress={() =>
          goToDetailsHandler(props.itemData.id, props.itemData.title)
        }
      >
        <View>
          <View style={{ ...styles.productRow, ...styles.productHeader }}>
            <ImageBackground
              source={
                !props.itemData.imageUri ||
                props.itemData.imageUri === "defaultPicture"
                  ? icon
                  : { uri: props.itemData.imageUri }
              }
              style={styles.bgImage}
            >
              <View style={styles.titleContainer}>
                <CONST_boldText ownStyle={styles.title}>
                  {props.itemData.title}
                </CONST_boldText>
              </View>
            </ImageBackground>
          </View>
          {/*<View*/}
          {/*  style={*/}
          {/*    props.workoutMode*/}
          {/*      ? { ...styles.workoutStyle }*/}
          {/*      : { ...styles.productRow, ...styles.productDetail }*/}
          {/*  }*/}
          {/*>*/}
          {/*  /!*<View style={styles.btn}>{Button1}</View>*!/*/}
          {/*  {props.workoutMode ? null : (*/}
          {/*    <CONST_boldText>{props.itemData.sets} set(s)</CONST_boldText>*/}
          {/*  )}*/}
          {/*  /!*{props.workoutMode ? null : Button2}*!/*/}
          {/*</View>*/}
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
  // productRow: {
  //   flexDirection: "row",
  // },
  titleContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 5,
    paddingHorizontal: 12,
  },

  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },

  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
});

export default C_StartWorkoutExercise;
