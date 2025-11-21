import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { CameraView } from "expo-camera";
import { useScan } from "../hooks";

export default function Scanner() {
  const { cameraRef, setLayout, scan, isLoading } = useScan();

  return (
    <View style={styles.container} onLayout={(e) => setLayout(e.nativeEvent.layout)}>
      
      <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} />

      <View style={styles.topOverlay} />
      <View style={styles.bottomOverlay} />
      <View style={styles.leftOverlay} />
      <View style={styles.rightOverlay} />

      <View style={styles.box} />

      {scan.croppedUri && isLoading ? (
        <Image source={{ uri: scan.croppedUri }} style={styles.preview} />
      ) : null}
    </View>
  );
}

const BOX_TOP = 50;
const BOX_HEIGHT = 230;
const BOX_LEFT = "5%";
const BOX_WIDTH = "90%";

const styles = StyleSheet.create({
  container: { flex: 1 },

  topOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: BOX_TOP,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  bottomOverlay: {
    position: "absolute",
    top: BOX_TOP + BOX_HEIGHT,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  leftOverlay: {
    position: "absolute",
    top: BOX_TOP,
    left: 0,
    width: "5%",
    height: BOX_HEIGHT,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  rightOverlay: {
    position: "absolute",
    top: BOX_TOP,
    right: 0,
    width: "5%",
    height: BOX_HEIGHT,
    backgroundColor: "rgba(0,0,0,0.55)",
  },

  box: { 
    position: "absolute",
    top: BOX_TOP,
    left: BOX_LEFT,
    width: BOX_WIDTH,
    height: BOX_HEIGHT,
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 10,
    backgroundColor: "transparent",
  },

  preview: { 
    position: "absolute", 
    top: BOX_TOP, 
    left: BOX_LEFT, 
    width: BOX_WIDTH, 
    height: BOX_HEIGHT,
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: "#fff" 
  },
});
