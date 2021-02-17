import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import CONST_normalText from "./constants/CONST_normalText";
import CONST_boldText from "./constants/CONST_boldText";
import CONST_Colors from "./constants/CONST_Colors";
import CONST_Categories from "./constants/CONST_Categories";

const C_historyWorkout = (props) => {
  const history = props.historyData.item;

  console.log("TAKE TIME");
  console.log(history.catId);

  const workoutCat = CONST_Categories.find(
    (category) => category.categoryNumber === history.catId
  );

  return (
    <View style={{ ...styles.screen, height: props.height }}>
      <TouchableOpacity
        onPress={() => {
          props.onPressHistoryDetail(history.id, history.title);
        }}
      >
        <View style={styles.singleWorkout}>
          <Image source={workoutCat.categoryPicture} style={styles.image} />
          <View style={styles.idTitle}>
            <CONST_boldText ownStyle={{ fontSize: 20 }}>
              {props.historyData.item.title}
            </CONST_boldText>
          </View>
          <View style={styles.idTitle}>
            <CONST_boldText
              ownStyle={{ fontSize: 20, color: CONST_Colors.primary }}
            >
              {history.date.getDate()}
              {"."}
              {history.date.getMonth()}
              {"."}
              {history.date.getFullYear()}
            </CONST_boldText>
          </View>
        </View>
      </TouchableOpacity>
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

export default C_historyWorkout;
