import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Button, Alert } from "react-native";
import CONST_Colors from "./constants/CONST_Colors";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const C_imagePicker = (props) => {
  const [pickedImage, setPickedImage] = useState();
  const [defaultImage, setDefaultImage] = useState(false);

  const icon = "../assets/Dumbells-gym-fitness-workout-icon-by-Hoeda80.jpeg";

  const verifyPermissions = async () => {
    const resultCam = await Permissions.askAsync(Permissions.CAMERA);
    const resultCamRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (resultCam.status !== "granted" && resultCamRoll.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const noImageHandler = () => {
    setDefaultImage(true);
    setPickedImage(icon);
    props.onImageTaken(pickedImage);
  };

  const takeImageHandler = async () => {
    setDefaultImage(false);
    const hasPermission = await verifyPermissions();
    if (hasPermission) {
      const image = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 5],
        quality: 0.5,
      });
      setPickedImage(image.uri);
      props.onImageTaken(image.uri);
    }
  };

  let image = <Image style={styles.image} source={{ uri: pickedImage }} />;
  let currentImage = null;

  if (defaultImage) {
    image = <Image style={styles.image} source={require(icon)} />;
  }
  if (props.editMode) {
    if (!props.currentImage) {
      currentImage = <Image style={styles.image} source={require(icon)} />;
    } else {
      currentImage = (
        <Image style={styles.image} source={{ uri: props.currentImage }} />
      );
    }
  }

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {props.editMode && !pickedImage ? (
          currentImage
        ) : !props.editMode && !pickedImage && !defaultImage ? (
          <Text>No image picked yet</Text>
        ) : (
          image
        )}
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title="Take Image"
            color={CONST_Colors.primary}
            onPress={takeImageHandler}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="No Image"
            color={CONST_Colors.accent}
            onPress={noImageHandler}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginVertical: 15,
  },
  imagePreview: {
    width: "80%",
    height: 300,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    marginHorizontal: 20,
    width: "30%",
  },
});

export default C_imagePicker;
