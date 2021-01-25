import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Button,
  TouchableHighlight,
} from "react-native";

import CONST_Colors from "./constants/CONST_Colors";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import icon from "../assets/Dumbells-gym-fitness-workout-icon-by-Hoeda80.jpeg";

import CONST_boldText from "./constants/CONST_boldText";

const C_ExerciseList = (props) => {
  let Button1 = (
    <Button
      title="DETAILS"
      onPress={() =>
        props.onSelectDetail(props.itemData.item.id, props.itemData.item.title)
      }
      color={CONST_Colors.primary}
    />
  );

  let Button2 = (
    <View style={{ ...styles.productRow, ...styles.btn }}>
      <View style={styles.innerBtn}>
        <Button
          title="EDIT"
          onPress={() => {
            props.onEditExercise(props.itemData.item);
          }}
          color={CONST_Colors.primary}
        />
      </View>
      <View style={styles.icon}>
        <Entypo name="pencil" size={24} color="white" />
      </View>
    </View>
  );

  return (
    <View style={styles.gridItem}>
      <TouchableOpacity
        onPress={
          props.workoutMode
            ? () => props.onAddExerciseToWorkout(props.itemData.item)
            : () =>
                props.onSelectDetail(
                  props.itemData.item.id,
                  props.itemData.item.title
                )
        }
      >
        <View>
          <View style={{ ...styles.productRow, ...styles.productHeader }}>
            <ImageBackground
              source={
                !props.itemData.item.imageUri ||
                props.itemData.item.imageUri === "defaultPicture"
                  ? icon
                  : { uri: props.itemData.item.imageUri }
              }
              style={styles.bgImage}
            >
              <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {props.itemData.item.title}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View
            style={
              props.workoutMode
                ? { ...styles.workoutStyle }
                : { ...styles.productRow, ...styles.productDetail }
            }
          >
            <View style={styles.btn}>{Button1}</View>
            {props.workoutMode ? null : (
              <CONST_boldText>{props.itemData.item.sets} set(s)</CONST_boldText>
            )}
            {props.workoutMode ? null : Button2}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    height: 230,
    width: "100%",
    backgroundColor: "lightgrey",
    marginVertical: 15,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: CONST_Colors.accent,
  },
  productRow: {
    flexDirection: "row",
  },

  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  test: {
    backgroundColor: CONST_Colors.primary,
  },
  innerBtn: {
    width: "70%",
  },
  icon: {
    marginLeft: "2.5%",
    alignItems: "center",
    justifyContent: "center",
  },

  workoutStyle: {
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
    height: "15%",
  },

  productDetail: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
    height: "15%",
  },

  titleContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  productHeader: {
    height: "82%",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  btn: {
    width: "30%",
    backgroundColor: CONST_Colors.primary,
  },

  //////
});

export default C_ExerciseList;
