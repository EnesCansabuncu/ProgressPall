
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import { COLORS, DARK_COLORS } from '../../styles/theme';
import { useAppContext } from '../context/AppContext';

// Screens
import Dashboard from '../screens/Dashboard';
import Tasks from '../screens/Tasks';
import Habits from '../screens/Habits';
import Profile from '../screens/Profile';
import AddTask from '../screens/AddTask';
import AddHabit from '../screens/AddHabit';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Tab Icons
const TabIcon = ({ name, focused, color }) => {
  const icons = {
    Dashboard: '📊',
    Tasks: '✅',
    Habits: '🔄',
    İstatistikler: '📈',
  };
  
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>{icons[name]}</Text>
    </View>
  );
};

// Tasks Stack Navigator
const TasksStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TasksMain" component={Tasks} />
      <Stack.Screen name="AddTask" component={AddTask} />
    </Stack.Navigator>
  );
};

// Habits Stack Navigator
const HabitsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HabitsMain" component={Habits} />
      <Stack.Screen name="AddHabit" component={AddHabit} />
    </Stack.Navigator>
  );
};

// Dashboard Stack Navigator
const DashboardStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashboardMain" component={Dashboard} />
      <Stack.Screen name="AddTask" component={AddTask} />
      <Stack.Screen name="AddHabit" component={AddHabit} />
    </Stack.Navigator>
  );
};

// Basit Tab Navigator
const AppNavigator = () => {
  const { darkMode } = useAppContext();
  const colors = darkMode ? DARK_COLORS : COLORS;
  
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon name={route.name} focused={focused} color={color} />
          ),
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.gray500,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopWidth: 1,
            borderTopColor: colors.gray200,
            paddingBottom: 5,
            paddingTop: 5,
            height: 70,
            elevation: 8,
            shadowColor: colors.shadow || '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Dashboard" component={DashboardStack} />
        <Tab.Screen name="Tasks" component={TasksStack} />
        <Tab.Screen name="Habits" component={HabitsStack} />
        <Tab.Screen name="İstatistikler" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
