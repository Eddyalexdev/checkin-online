import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { CameraView } from "expo-camera";
import { useScan } from "../hooks";

export default function Scanner() {
  const { cameraRef, setLayout, scan, isLoading } = useScan();

  return (
    <View style={styles.container} onLayout={(e) => setLayout(e.nativeEvent.layout)}>
      <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} />

      <View style={styles.overlay} />
      <View style={styles.box} />

      {scan.croppedUri && isLoading ? <Image source={{ uri: scan.croppedUri }} style={styles.preview} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.55)" },
  box: { position: "absolute", top: "12%", left: "5%", width: "90%", height: 230, borderWidth: 1, borderColor: "#FFF", borderRadius: 10 },
  button: { position: "absolute", bottom: 40, alignSelf: "center", backgroundColor: "#1b73e8", padding: 12, borderRadius: 8 },
  preview: { position: "absolute", left: "5%", top: "12%", width: "90%", height: 230, borderRadius: 10, borderWidth: 1, borderColor: "#fff" },
});
