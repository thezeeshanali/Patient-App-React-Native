import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProductsListScreen from "./Screens/ProductsListScreen";
import ProductDetailsScreen from "./Screens/ProductDetailsScreen";
import ProfileForm from "../../Auth/Screens/ProfileForm";

const Stack = createStackNavigator();

function ProductsStackNavigator(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hide header for all screens in this tab navigator
      }}
    >
      <Stack.Screen name="ProductsListScreen" component={ProductsListScreen} />
      <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
      />
      <Stack.Screen name="ProfileForm" component={ProfileForm} />
      
    </Stack.Navigator>
  );
}

export default ProductsStackNavigator;
