import React from "react";
import { StyleSheet, Text, View } from "react-native";

// import colors from "../constants/_CONST_colors";

const CONST_boldText = (props) => {
  return (
    <View style={props.style}>
      <Text style={{ ...styles.normalText, ...props.ownStyle }}>
        {props.children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  normalText: {
    fontSize: 14,
    color: "black",
    fontFamily: "open-sans-bold",
  },
});

export default CONST_boldText;
