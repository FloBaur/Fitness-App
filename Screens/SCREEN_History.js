import React from "react";
import { View, StyleSheet, Text, Platform, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import C_HeaderButtons from "../components/C_HeaderButtons";
import C_historyWorkout from "../components/C_historyWorkout";

const SCREEN_History = (props) => {
  const myHistory = useSelector((state) => state.statistics.workoutHistory);

  console.log("Wie lang i no leeb");
  console.log(myHistory);

  const onPressDetailHandler = (id, title) => {
    const thisHistory = myHistory.find((history) => history.id === id);
    props.navigation.navigate("HistoryDetail", {
      history: thisHistory,
      id: id,
      title: title,
    });
  };

  const renderHistory = (history) => {
    return (
      <C_historyWorkout
        historyData={history}
        onPressHistoryDetail={onPressDetailHandler}
      />
    );
  };

  if (myHistory.length === 0) {
    return (
      <View style={styles.screen}>
        <Text>You have not solved any workouts yet</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.screen}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={myHistory}
          renderItem={renderHistory}
          numColumns={1}
          style={{ width: "100%" }}
        />
      </View>
    );
  }
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Workout history",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={C_HeaderButtons}>
        <Item
          title="History"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SCREEN_History;
