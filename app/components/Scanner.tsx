import { CameraView } from "expo-camera";
import { View, StyleSheet } from "react-native";

const Scanner = () => {
  return (
    <View style={styles.container}>
      <CameraView style={StyleSheet.absoluteFill} />
      <View style={styles.overlay} />
      <View style={styles.box} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.55)",
  },

  box: {
    position: "absolute",
    top: "12%",
    left: "5%",
    width: "90%",
    height: 230,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 30,
    backgroundColor: "transparent",
  },
});

export default Scanner;
