import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Platform } from "react-native";
import CONST_boldText from "./constants/CONST_boldText";
import MODEL_Set from "./models/MODEL_Set";
import { useDispatch } from "react-redux";

import CONST_Colors from "./constants/CONST_Colors";

let sets = [];
let perfectArray = [];

const C_SetsList = (props) => {
  let firstBox = null;
  let secondBox = null;
  const presets = props.presets;

  useEffect(() => {
    if (props.fireSet) {
      props.onFire(perfectArray);
    }
  }, [props.fireSet]);

  if (props.editMode && perfectArray.length === 0) {
    perfectArray = presets;
  }
  // if (props.editMode && props.numOfSets < presets.length) {
  //   const trim = presets.length - props.numOfSets;
  //   perfectArray.pop();
  //   console.log("sliced " + trim);
  //   console.log(perfectArray);
  // }
  //only in Edit Mode
  const [editReps, setEditReps] = useState(null);
  const [editWeight, setEditWeight] = useState(null);

  const buildSet = () => {
    let myVal = null;
    let newSet = null;
    const allSets = [...sets];

    try {
      if ((editReps && !editWeight) || (editWeight && !editReps)) {
        const mySet = presets.find((set) => set.id === props.index);
        if (editReps) {
          myVal = mySet.set.weight;
        }
        if (editWeight) {
          myVal = mySet.set.reps;
        }
      }
      if (myVal && editReps) {
        newSet = new MODEL_Set(props.index, editReps, myVal);
      } else if (myVal && editWeight) {
        newSet = new MODEL_Set(props.index, myVal, editWeight);
      } else {
        newSet = new MODEL_Set(props.index, editReps, editWeight);
      }
      const isThereASet = allSets.find((set) => set.id === newSet.id);
      if (isThereASet) {
        const indexOfSet = allSets.findIndex((set) => set.id === newSet.id);
        allSets.splice(indexOfSet, 1, newSet);
        sets = allSets;
      } else {
        sets.push(newSet);
        // }
      }

      console.log("hier kommt der Merge");
      let merged = [];

      for (let i = 0; i < perfectArray.length; i++) {
        merged.push({
          ...perfectArray[i],
          ...sets.find((itmInner) => itmInner.id === perfectArray[i].id),
        });
      }
      perfectArray = merged;
      // console.log(perfectArray);
      sets = [];
    } catch (err) {
      console.log(err);
    }
  };

  if (!props.show) {
    firstBox = (
      <TextInput
        id="set"
        keyboardType="number-pad"
        numberOfLines={1}
        style={styles.input}
        onChangeText={
          props.editMode
            ? (rep) => setEditReps(rep)
            : (rep) => props.onChangeRep(rep)
        }
        // value={props.reps}
        // onEndEditing={() => props.onEndEdit(props.index.index + 1)}
        onEndEditing={
          props.editMode ? () => buildSet() : () => props.onEndEdit()
        }
        defaultValue={
          props.editMode && presets.length > 0
            ? props.presets[props.index - 1].set.reps
            : null
        }
      />
    );

    secondBox = (
      <TextInput
        id="set"
        keyboardType="number-pad"
        numberOfLines={1}
        onChangeText={
          props.editMode
            ? (weight) => setEditWeight(weight)
            : (weight) => props.onChangeWeight(weight)
        }
        // value={title}
        minLength={5}
        style={styles.input}
        onEndEditing={
          props.editMode
            ? () => buildSet()
            : () => props.onEndEdit(props.index.index + 1)
        }
        defaultValue={
          props.editMode && presets.length > 0
            ? props.presets[props.index - 1].set.weight
            : null
        }
      />
    );
  } else {
    firstBox = (
      <View>
        <CONST_boldText ownStyle={{ fontSize: 24 }}>
          {props.itemData.set.reps}
        </CONST_boldText>
      </View>
    );

    secondBox = (
      <View>
        <CONST_boldText ownStyle={{ fontSize: 24 }}>
          {props.itemData.set.weight}
        </CONST_boldText>
      </View>
    );
  }

  return (
    <View style={styles.gridItem}>
      <Text style={styles.title}>{`set ${props.index}`}</Text>
      <View style={styles.setBox}>
        <View style={{ flexDirection: "column", width: 90 }}>
          <View style={{ justifyContent: "center" }}>
            <Text style={styles.label}>Repetitions</Text>
          </View>
          <View style={styles.test}>{firstBox}</View>
        </View>
        <View style={{ flexDirection: "column", width: 90 }}>
          <View>
            <Text style={styles.label}>Weight</Text>
          </View>
          <View style={styles.test}>{secondBox}</View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    height: 150,
    width: 300,
    backgroundColor: "lightgrey",
    marginVertical: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    color: CONST_Colors.primary,
    textAlign: "center",
    marginTop: 10,
  },
  setBox: {
    flexDirection: "row",
    paddingHorizontal: "15%",
    paddingTop: "5%",
    justifyContent: "space-between",
    height: "100%",
  },
  label: {
    fontFamily: "open-sans",
    fontSize: 16,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    fontSize: 24,
    fontWeight: "bold",
  },
  test: {
    justifyContent: "center",
  },

  //////
});

export default C_SetsList;
