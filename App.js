import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { AppProvider, useAppContext } from './src/context/AppContext';

function AppContent() {
  const { darkMode } = useAppContext();
  
  return (
    <SafeAreaProvider>
      <StatusBar style={darkMode ? 'light' : 'dark'} />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
