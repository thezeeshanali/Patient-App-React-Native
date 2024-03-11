import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./Home/HomeStackNavigator";
import ProductsStackNavigator from "./Products/ProductsStackNavigator";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function MainBottomTabNavigator(props) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Hide header for all screens in this tab navigator
      }}
    >
      <Tab.Screen
          name="HomeStack"
          component={HomeNavigator}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="ProductsStack"
          component={ProductsStackNavigator}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user" color={color} size={size} />
            ),
          }}
        />
    </Tab.Navigator>
  );
}

export default MainBottomTabNavigator;
