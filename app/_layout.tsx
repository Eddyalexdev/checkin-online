import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ScanProvider } from '@/context';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />

      <ScanProvider>
        <Stack screenOptions={{ headerTitleAlign: 'center' }}>
          {/* Home Screen */}
          <Stack.Screen name="index" options={{ title: 'Checkin online' }} />

          {/* Front Scanner */}
          <Stack.Screen name="screens/FrontScanScreen" options={{ title: 'Checkin online' }} />

          {/* Back Scanner */}
          <Stack.Screen name="screens/BackScanScreen" options={{ title: 'Checkin online' }} />

          {/* Form Personal Info */}
          <Stack.Screen name="screens/PersonalInfoScreen" options={{ title: 'Checkin online' }} />

          {/* Form Personal Info */}
          <Stack.Screen name="screens/DocumentInfoScreen" options={{ title: 'Checkin online' }} />

          {/* View Information */}
          <Stack.Screen name="screens/ViewInformationScreen" options={{ title: 'View Information' }} />
        </Stack>
      </ScanProvider>
    </SafeAreaProvider>
  );
}
