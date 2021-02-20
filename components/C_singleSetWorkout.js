import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Dimensions,
  Alert,
} from "react-native";
import CONST_boldText from "./constants/CONST_boldText";
import CONST_Colors from "./constants/CONST_Colors";
import { addStarToStatics } from "../Store/actions/ACTION_Statistics";

const C_singleSetWorkout = (props) => {
  const [backgroundColor, setBackgroundColor] = useState("lightgrey");

  const firstBox = (
    <Text style={{ fontSize: 18 }}>{props.myExercise.item.reps}</Text>
  );
  const secondBox = (
    <Text style={{ fontSize: 18 }}>{props.myExercise.item.weight}</Text>
  );

  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState(0);

  const moreOrLess = (reps, weight) => {
    const power = reps * weight;
    const oldPower = props.myExercise.item.reps * props.myExercise.item.weight;
    if (power > oldPower) {
      setBackgroundColor("lightgreen");
      // dispatch(addStarToStatics(1, new Date(), "normal"));
      return "green";
    } else if (power < oldPower) {
      setBackgroundColor("#f99898");
      return "red";
    } else {
      setBackgroundColor("lightblue");
      return "same";
    }
  };

  const doneSetHandler = (id) => {
    const color = moreOrLess(reps, weight);
    props.onDone(id, reps, weight, color);
  };

  return (
    <View style={{ ...styles.gridItem, backgroundColor: backgroundColor }}>
      <CONST_boldText ownStyle={styles.title}>
        Set {props.myExercise.index + 1}
      </CONST_boldText>
      <View style={styles.setBox}>
        <View style={{ flexDirection: "column", width: 90 }}>
          <View style={{ justifyContent: "center" }}>
            <Text style={styles.label}>Repetitions</Text>
          </View>
          <TextInput
            id="set"
            keyboardType="number-pad"
            numberOfLines={1}
            onChangeText={(reps) => setReps(reps)}
            minLength={5}
            style={styles.input}
            // onEndEditing={}
            defaultValue={null}
          />
          <View style={styles.preset}>{firstBox}</View>
        </View>
        <View style={{ flexDirection: "column", width: 90 }}>
          <View>
            <Text style={styles.label}>Weight</Text>
          </View>

          <TextInput
            id="set"
            keyboardType="number-pad"
            numberOfLines={1}
            onChangeText={(weight) => setWeight(weight)}
            minLength={5}
            style={styles.input}
            // onEndEditing={}
            defaultValue={null}
          />
          <View style={styles.preset}>{secondBox}</View>
        </View>
      </View>
      <View style={styles.button}>
        <Button
          title="Done"
          color={CONST_Colors.primary}
          onPress={() => doneSetHandler(props.myExercise.index + 1)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    height: 250,
    width: Dimensions.get("window").width / 1.2,
    marginVertical: 15,
    borderRadius: 10,
    overflow: "hidden",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 25,
    color: CONST_Colors.primary,
    marginTop: 10,
    textAlign: "center",
  },
  setBox: {
    flexDirection: "row",
    paddingHorizontal: "15%",
    paddingTop: "5%",
    justifyContent: "space-between",
    height: "60%",
  },
  label: {
    fontFamily: "open-sans",
    fontSize: 16,
    textAlign: "center",
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#787878",
    borderBottomWidth: 1,
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    color: CONST_Colors.primary,
    textAlign: "center",
  },
  preset: {
    alignSelf: "center",
    marginTop: 10,
  },
  button: {
    width: "30%",
    alignSelf: "center",
  },
});

export default C_singleSetWorkout;
