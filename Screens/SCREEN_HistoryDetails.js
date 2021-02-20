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

import CONST_boldText from "../components/constants/CONST_boldText";
import CONST_normalText from "../components/constants/CONST_normalText";
import CONST_Colors from "../components/constants/CONST_Colors";
import icon from "../assets/Dumbells-gym-fitness-workout-icon-by-Hoeda80.jpeg";

const SCREEN_HistoryDetails = (props) => {
  const historyWorkoutData = props.route.params.history.workout;

  return (
    <ScrollView>
      <FlatList
        keyExtractor={(item) => item.key}
        data={historyWorkoutData}
        renderItem={(item, index) => {
          return (
            <View style={styles.screen}>
              <View style={styles.workout}>
                <Image
                  source={
                    !historyWorkoutData[item.index].picture ||
                    historyWorkoutData[item.index].picture === "defaultPicture"
                      ? icon
                      : { uri: historyWorkoutData[item.index].picture }
                  }
                  style={styles.image}
                />
                <View style={{ margin: 20 }}>
                  <CONST_boldText ownStyle={{ fontSize: 20 }}>
                    {historyWorkoutData[item.index].title}
                  </CONST_boldText>
                </View>
              </View>
              <View style={styles.exercises}>
                <FlatList
                  keyExtractor={(items, index) => items.index}
                  listKey={item.index}
                  data={historyWorkoutData[item.index].exercise}
                  renderItem={(items, index) => {
                    return (
                      <View style={styles.test}>
                        <CONST_boldText
                          ownStyle={{
                            fontSize: 16,
                            color: CONST_Colors.primary,
                          }}
                        >
                          set{" "}
                          {
                            historyWorkoutData[item.index].exercise[items.index]
                              .id
                          }
                        </CONST_boldText>
                        <View style={styles.sets}>
                          <View style={{ marginHorizontal: 10 }}>
                            <Text>
                              repetitions:{" "}
                              {
                                historyWorkoutData[item.index].exercise[
                                  items.index
                                ].reps
                              }
                            </Text>
                          </View>
                          <Text>
                            weight:{" "}
                            {
                              historyWorkoutData[item.index].exercise[
                                items.index
                              ].weight
                            }{" "}
                            kg
                          </Text>
                        </View>
                      </View>
                    );
                  }}
                  numColumns={1}
                />
              </View>
            </View>
          );
        }}
        numColumns={1}
      />
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  const historyTitle = navData.route.params.title;
  return {
    headerTitle: historyTitle,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    // width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
  },

  image: {
    width: "40%",
    height: Dimensions.get("window").height / 6,
    borderWidth: 1,
    borderColor: "#CCC",
  },
  workout: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    margin: 10,
  },
  exercises: {
    alignSelf: "flex-start",
    margin: 10,

    width: "100%",
  },
  test: {
    // alignItems: "stretch",
    // justifyContent: "center",
  },
  sets: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    margin: 5,
  },
});

export default SCREEN_HistoryDetails;
