import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ScanProvider } from '@/context';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <ScanProvider>
        <Stack initialRouteName="screens/FrontScanScreen">
          {/* Front Scanner */}
          <Stack.Screen name="screens/FrontScanScreen" options={{ title: 'Checkin online' }} />

          {/* Back Scanner */}
          <Stack.Screen name="screens/BackScanScreen" options={{ title: 'Checkin online'  }} />

          {/* Form Personal Info */}
          <Stack.Screen name="screens/PersonalInfoScreen" options={{ title: 'Checkin online'  }} />
        </Stack>
      </ScanProvider>
    </SafeAreaProvider>
  );
}

