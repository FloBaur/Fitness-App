import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  FlatList,
  Platform,
} from "react-native";

import DropDownPicker from "react-native-dropdown-picker";
import CONST_Colors from "../components/constants/CONST_Colors";
import MODEL_Exercise from "../components/models/MODEL_Exercise";
import MODEL_Set from "../components/models/MODEL_Set";
import { useDispatch, useSelector } from "react-redux";

import C_SetsList from "../components/C_SetsList";
import C_imagePicker from "../components/C_ImagePicker";
import { addExercise, editExercise } from "../Store/actions/ACTION_Exercises";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import C_HeaderButtons from "../components/C_HeaderButtons";

let exerciseSets = [];
let updatedSet = [];

const SCREEN_AddExercise = (props) => {
  const [numberOfSets, setNumberOfSets] = useState(null);
  const [reps, setReps] = useState(null);
  const [weight, setWeight] = useState(null);
  const [title, setTitle] = useState("");
  const [inputFields, setInputFields] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [image, setImage] = useState();
  const [editingMode, setEditingMode] = useState(false);
  const [fireDispatchUpdatedSet, setFireDispatchUpdatedSet] = useState(false);
  const [items, setItems] = useState([
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
  ]);

  const dispatch = useDispatch();

  // const updatedSet = useSelector((state) => state.exercises.updatedSet);

  let sets = [];

  const setEditHandler = useCallback(() => {
    setEditingMode(true);
    setNumberOfSets(props.route.params.exerciseSets);
  }, []);

  useEffect(() => {
    if (props.route.params.editingMode) {
      setEditHandler();
    }
  }, [editingMode]);

  useEffect(() => {
    if (numberOfSets != null) {
      for (let i = 0; i < numberOfSets; i++) {
        sets.push({
          set: {
            repetitions: null,
            weight: null,
          },
        });
      }
      setInputFields(sets);
    }
  }, [numberOfSets]);

  const setTitleHandler = (text) => {
    setTitle(text);
  };

  const imageTakenHandler = (imagePath) => {
    setImage(imagePath);
  };

  const buildSetHandler = (index) => {
    if (reps != null && weight != null) {
      const set = new MODEL_Set(parseInt(index), reps, weight);
      exerciseSets.push(set);
      setReps(null);
      setWeight(null);
    }
  };
  const createExercise = (id, updatedSet) => {
    let newTitle = "";
    let exercises = [];

    if (editingMode && title === "") {
      newTitle = props.route.params.exerciseTitle;
      exercises = updatedSet;
    } else {
      newTitle = title;
      id = Math.floor(Math.random() * 1000);
      exercises = exerciseSets;
    }
    const exercise = new MODEL_Exercise(
      id,
      newTitle,
      image,
      numberOfSets,
      exercises
    );
    exerciseSets = [];
    return exercise;
  };
  const onFireHandler = (updatedSetFromComp) => {
    updatedSet = updatedSetFromComp;
  };

  const createNewExerciseHandler = () => {
    const exercise = createExercise();
    dispatch(addExercise(exercise));
    props.navigation.goBack();
  };

  useEffect(() => {
    if (updatedSet.length > 0 && fireDispatchUpdatedSet) {
      const exercise = createExercise(
        props.route.params.exerciseId,
        updatedSet
      );
      dispatch(editExercise(exercise));
      props.navigation.navigate("Exercises", {});
    }
  });

  // useEffect(() => {
  if (editingMode) {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={C_HeaderButtons}>
          <Item
            iconName={
              Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
            }
            onPress={() => {
              setFireDispatchUpdatedSet(true);
            }}
          />
        </HeaderButtons>
      ),
    });
  }
  // }, [editingMode]);

  const setInput = (
    <View style={styles.list}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={inputFields}
        renderItem={(item, index) => {
          return (
            <C_SetsList
              itemData={inputFields}
              index={item.index + 1}
              key={item.index}
              editMode={editingMode}
              presets={props.route.params.presets}
              numOfSets={numberOfSets}
              fireSet={fireDispatchUpdatedSet}
              onFire={(set) => onFireHandler(set)}
              onChangeRep={(reps) => setReps(reps)}
              onChangeWeight={(weight) => setWeight(weight)}
              onEndEdit={() => buildSetHandler(item.index + 1)} //Bau den Satz mit den Wiederholungen zusammen
            />
          );
        }}
        numColumns={1}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.formContainer}>
          <View>
            <Text style={styles.label}>Title</Text>
            <TextInput
              id="Title"
              errorText="Please enter a valid title!"
              keyboardType="default"
              autoCapitalize="sentences"
              autoCorrect
              style={styles.input}
              numberOfLines={1}
              onChangeText={(text) => {
                setTitleHandler(text);
              }}
              // value={editingMode ? props.route.params.exerciseTitle : title}
              defaultValue={editingMode ? props.route.params.exerciseTitle : ""}
            />
            <C_imagePicker
              onImageTaken={(uri) => imageTakenHandler(uri)}
              editMode={editingMode}
              currentImage={props.route.params.exerciseImage}
            />
            <Text style={styles.label}>Sets</Text>
            {/**/}

            <View style={{ marginBottom: isVisible ? 160 : 10 }}>
              <DropDownPicker
                items={items}
                defaultValue={
                  editingMode ? props.route.params.exerciseSets : null
                }
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: "#fafafa" }}
                itemStyle={{ justifyContent: "flex-start" }}
                dropDownStyle={{ backgroundColor: "#fafafa" }}
                onChangeItem={(number) => setNumberOfSets(number.value)}
                placeholder="Select the number of sets"
                isVisible={isVisible}
                onOpen={() => setIsVisible(true)}
                onClose={() => setIsVisible(false)}
              />
            </View>
            {numberOfSets === null ? null : setInput}
          </View>
          {editingMode ? null : (
            <View style={styles.button}>
              <Button
                title="CREATE EXERCISE"
                color={CONST_Colors.primary}
                onPress={createNewExerciseHandler}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: navData.route.params.editingMode
      ? `Edit ${navData.route.params.exerciseTitle}`
      : "Add an Exercise",
  };
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    margin: 20,
    height: "100%",
  },
  form: {},
  dropdown: {
    marginTop: 20,
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  list: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 15,
    alignItems: "center",
  },
  button: {
    marginVertical: 20,
    paddingHorizontal: 100,
  },
});

export default SCREEN_AddExercise;
