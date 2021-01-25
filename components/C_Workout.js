import React from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";
import CONST_normalText from "./constants/CONST_normalText";
import CONST_boldText from "./constants/CONST_boldText";
import CONST_Colors from "./constants/CONST_Colors";
import CONST_Categories from "./constants/CONST_Categories";

const C_Workout = (props) => {
  const workoutCat = CONST_Categories.find(
    (category) => category.categoryNumber === props.workoutData.categoryNumber
  );

  return (
    <View style={{ ...styles.screen, height: props.height }}>
      <View style={styles.singleWorkout}>
        <Image source={workoutCat.categoryPicture} style={styles.image} />
        <View style={styles.idTitle}>
          <CONST_boldText>{props.workoutData.title} </CONST_boldText>
        </View>
        <View style={styles.btn}>
          <Button
            title={!props.extraData ? "SHOW" : "HIDE"}
            onPress={
              props.extraData
                ? props.onHide
                : () => props.onDetail(props.workoutData.id)
            }
            color={CONST_Colors.primary}
          />
        </View>
        <View style={styles.btn}>
          <Button
            title="Start"
            onPress={() =>
              props.onStart(props.workoutData.id, props.workoutData.title)
            }
            color={CONST_Colors.primary}
          />
        </View>
      </View>
      <View>{props.extraData}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    marginHorizontal: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    marginVertical: 10,
    padding: 15,
  },
  idText: {
    width: "5%",
    marginLeft: 5,
    flexDirection: "row",
  },
  idTitle: {
    width: "30%",
    marginLeft: 5,
    flexDirection: "row",
  },
  singleWorkout: {
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    flexDirection: "row",
  },
  image: {
    width: 70,
    height: "110%",
  },
  btn: { width: 60 },
});

export default C_Workout;
