import React from "react";
import { Platform, StatusBar, StyleSheet } from "react-native"; // Import Platform and StatusBar

import { createStackNavigator } from "@react-navigation/stack";

import MainBottomTabNavigator from "./MainBottomTabNavigator";

const Stack = createStackNavigator();

function MainNavigator(props) {
  // const statusBarHeight = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hide header for all screens in this navigator
        // Apply status bar height padding as paddingBottom
        // cardStyle: { paddingTop: statusBarHeight },
      }}
    >
      <Stack.Screen
        name="MainBottomTabNavigator"
        component={MainBottomTabNavigator}
      />
    </Stack.Navigator>
  );
}

export default MainNavigator;
