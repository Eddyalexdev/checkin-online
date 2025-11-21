import React, { useState } from 'react';

// Data
import data from '../../data/requirements.json';

// Components
import { Card, Scanner } from '../components';
import { View, StyleSheet, Text } from 'react-native';
import { useCameraPermissions, PermissionStatus } from 'expo-camera';

export default function FrontScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  // Check permission status
  if (!permission) {
    requestPermission();
    return null;
  }

  if (permission.status !== PermissionStatus.GRANTED) {
    return (
      <View style={styles.container}>
        <Text>Camera access is required to use this feature.</Text>
      </View>
    );
  }

  return (
    <View style={styles.view}>
      <View style={styles.container}>
        <Scanner />

        <Card 
          title="Escanea la parte delantera" 
          data={data.front}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  container: {
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    overflow: 'hidden',
    height: '100%',
    width: '100%',
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 64,
  },
});

