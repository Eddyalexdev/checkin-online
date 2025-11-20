import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { CameraView } from 'expo-camera';
import { useCameraPermissions, PermissionStatus } from 'expo-camera';

export default function FrontScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    requestPermission();
    return null;
  }

  if (permission.status !== PermissionStatus.GRANTED) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera access is required to use this feature.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} />
      <View style={styles.buttonContainer}>
        <Text style={styles.text}>Escanea la parte delantera</Text>
        <View style={styles.checkboxContainer}>
          <TextInput />
          <TextInput />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 64,
  },

  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },

  checkboxContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  }
});

