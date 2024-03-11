import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ForgotPasswordScreen from "./Screens/ForgotPasswordScreen";
import ProfileForm from "./Screens/ProfileForm";
import VerifyAccount from "./Screens/VerifyAccount";
import HomeScreen from "../Main/Home/Screens/Home/HomeScreen";
import AuthHeader from "./Screens/AuthHeader";
import Cardiologists from "../Main/Home/Screens/Home/components/Cardiologists";
import DoctorDetails from "../Main/Home/Screens/Home/components/DoctorDetails";
import BookAppointment from "../Main/Home/Screens/Appointments/BookAppointment";
import CardSummery from "../Main/Home/Screens/Appointments/CardSummery";
import AddAddress from "../Main/Home/Screens/Appointments/AddAddress";
import AddressList from "../Main/Home/Screens/Appointments/AddressList";
import ProfileScreen from "../Main/Home/Screens/Appointments/ProfileScreen";
import MyAppointments from "../Main/Home/Screens/Appointments/MyAppointments";
import Tracking from "../Main/Home/Screens/Appointments/Tracking";
import SettingsScreen from "../Main/Home/Screens/Appointments/SettingsScreen";
import NotificationScreen from "../Main/Home/Screens/Appointments/NotificationScreen";

const Stack = createStackNavigator();

function AuthNavigator(props) {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="LoginScreen"
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="AuthHeader" component={AuthHeader} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="ProfileForm" component={ProfileForm} />
      <Stack.Screen name="VerifyAccount" component={VerifyAccount} />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      {/* <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Cardiologist" component={Cardiologists} />
      <Stack.Screen name="DoctorDetails" component={DoctorDetails} />
      <Stack.Screen name="BookAppointment" component={BookAppointment} />
      <Stack.Screen name="CardSummery" component={CardSummery} />
      <Stack.Screen name="AddAddress" component={AddAddress} />
      <Stack.Screen name="AddressList" component={AddressList} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="MyAppointments" component={MyAppointments} />
      <Stack.Screen name="Tracking" component={Tracking} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} /> */}
    </Stack.Navigator>
  );
}

export default AuthNavigator;
