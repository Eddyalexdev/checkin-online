import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <Stack initialRouteName='screens/FrontScanScreen'>
        <Stack.Screen 
          name="screens/FrontScanScreen" 
          options={{ title: 'Checkin online' }} 
        />
        <Stack.Screen 
          name="screens/BackScanScreen"
          options={{ title: 'Checkin online' }} 
        />
      </Stack>

      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

