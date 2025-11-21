import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <Stack initialRouteName="screens/FrontScanScreen">
        {/* Front Scanner */}
        <Stack.Screen name="screens/FrontScanScreen" options={{ title: 'Welcome to checkin online' }} />
      </Stack>
    </SafeAreaProvider>
  );
}

