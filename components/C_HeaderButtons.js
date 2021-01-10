import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import CONST_Colors from "./constants/CONST_Colors";

import { Platform, View } from "react-native";

const C_HeaderButtons = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === "android" ? "white" : CONST_Colors.primary}
    />
  );
};

export default C_HeaderButtons;
