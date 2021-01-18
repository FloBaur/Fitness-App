import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Alert,
  FlatList,
  Image,
  TextInput,
  ScrollView,
  ImageBackground,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import C_HeaderButtons from "../components/C_HeaderButtons";
import {
  removeExerciseFromBasket,
  addWorkout,
  clearBasket,
} from "../Store/actions/ACTION_Exercises";
import CONST_Colors from "../components/constants/CONST_Colors";
import MODEL_Workout from "../components/models/MODEL_Workout";
import CONST_boldText from "../components/constants/CONST_boldText";
import CONST_normalText from "../components/constants/CONST_normalText";
import icon from "../assets/Dumbells-gym-fitness-workout-icon-by-Hoeda80.jpeg";
import CONST_Categories from "../components/constants/CONST_Categories";

let workoutNumber = 0;

const SCREEN_WorkoutBasket = (props) => {
  const icon = "../assets/Dumbells-gym-fitness-workout-icon-by-Hoeda80.jpeg";
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryNumber, setCategoryNumber] = useState();

  const exercisesInBasket = useSelector(
    (state) => state.exercises.workoutBasket
  );
  console.log("These Exercises are in the basket");
  console.log(exercisesInBasket);
  const dispatch = useDispatch();
  let workoutCats = [];

  for (let i = 0; i < CONST_Categories.length; i++) {
    let category = null;

    category = (
      <TouchableOpacity
        key={i}
        onPress={() => {
          setCategoryNumber(i);
        }}
      >
        <View
          style={
            categoryNumber === i
              ? { ...styles.boxes, ...styles.addStyle, ...styles.centerItem }
              : { ...styles.boxes, ...styles.centerItem }
          }
        >
          <View
            style={{
              ...styles.productRow,
              ...styles.productHeader,
              justifyContent: "center",
              padding: 10,
              marginTop: 5,
            }}
          >
            <ImageBackground
              source={CONST_Categories[i].categoryPicture}
              style={styles.bgImage}
            >
              {/*<View style={{ marginTop: 20 }}>*/}

              {/*</View>*/}
            </ImageBackground>
          </View>
          <View style={{ marginBottom: 15 }}>
            <Text>{CONST_Categories[i].categoryName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
    workoutCats.push(category);
  }
  const removeExerciseHandler = (id) => {
    dispatch(removeExerciseFromBasket(id));
  };

  const createWorkoutHandler = (exercisesFromBasket) => {
    const workout = new MODEL_Workout(
      workoutNumber,
      title,
      description,
      categoryNumber,
      exercisesFromBasket
    );
    workoutNumber = workoutNumber + 1;
    dispatch(addWorkout(workout));
    dispatch(clearBasket());
    Alert.alert("New workout!", `You successfully created a new workout`, [
      {
        text: "OKAY COOL",
        onPress: () => {
          props.navigation.goBack();
        },
      },
    ]);
  };

  const renderExercises = (exercises) => {
    return (
      <View style={styles.items}>
        <Image
          source={
            exercises.item.image ? { uri: exercises.item.image } : require(icon)
          }
          style={styles.image}
        />
        <View style={styles.innerText}>
          <CONST_normalText>{exercises.item.title} </CONST_normalText>
        </View>
        <View style={{ width: "15%", marginRight: "2%" }}>
          <CONST_boldText>
            {exercises.item.sets}
            {exercises.item.sets > 1 ? " sets" : " set"}
          </CONST_boldText>
        </View>
        <Button
          title="REMOVE"
          color={"grey"}
          onPress={() => removeExerciseHandler(exercises.item.id)}
        />
      </View>
    );
  };

  props.navigation.setOptions({
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={C_HeaderButtons}>
        <Item
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={() => {
            createWorkoutHandler(exercisesInBasket);
          }}
        />
      </HeaderButtons>
    ),
  });

  if (exercisesInBasket.length === 0)
    return (
      <View style={styles.screen}>
        <Text>You've picked no exercises for your workout yet</Text>
      </View>
    );

  return (
    <ScrollView>
      <View style={styles.screen}>
        <View style={styles.addInputDataForWorkout}>
          <Text style={styles.label}>Workout name</Text>
          <TextInput
            id="workoutTitle"
            errorText="Please enter a valid name!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            style={styles.input}
            numberOfLines={1}
            onChangeText={(text) => {
              setTitle(text);
            }}
            defaultValue={title}
          />
          <Text style={styles.label}>Workout description</Text>
          <TextInput
            id="workoutDescription"
            errorText="Please enter a valid name!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            style={styles.input}
            numberOfLines={3}
            onChangeText={(text) => {
              setDescription(text);
            }}
            defaultValue={description}
          />
          <Text style={styles.label}>Choose a picture</Text>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              marginRight: 20,
              flexWrap: "wrap",
            }}
          >
            {workoutCats}
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.label}>Your exercises for this workout</Text>
            <View style={{ marginLeft: 40, ...styles.itemName }}>
              <CONST_boldText>{exercisesInBasket.length}</CONST_boldText>
            </View>
          </View>
        </View>

        <View styles={{ marginTop: 20 }}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={exercisesInBasket}
            renderItem={renderExercises}
            numColumns={1}
            style={{ width: "100%" }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    marginHorizontal: 30,
    padding: 10,
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  items: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
  },
  image: {
    width: 40,
    height: "100%",
  },
  innerText: {
    width: "30%",
    marginLeft: 5,
  },
  itemName: {
    marginTop: 15,
    marginBottom: 5,
    borderColor: CONST_Colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    // flexDirection: "row",
    alignItems: "center",
    width: 50,
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  buttonCW: {
    marginTop: 20,
    width: "50%",
    justifyContent: "center",
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    width: "60%",
  },
  addInputDataForWorkout: {
    flex: 1,
    marginLeft: 20,
    marginTop: 20,
  },
  centerItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  boxes: {
    backgroundColor: "lightgray",
    height: 100,
    width: 100,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  productRow: {
    flexDirection: "row",
  },
  productHeader: {
    height: "82%",
  },

  addStyle: { borderWidth: 1, borderColor: CONST_Colors.primary },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: "Your Workout",
  };
};

export default SCREEN_WorkoutBasket;
