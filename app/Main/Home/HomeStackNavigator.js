import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./Screens/Home/HomeScreen";
import HeaderComponent from "./Screens/Home/components/HeaderComponent";
import DoctorsList from "./Screens/Home/components/DoctorsList";
import DoctorItem from "./Screens/Home/components/DoctorItem";
import TopDoctorsList from "./Screens/Home/components/TopDoctorList";
import TopDoctor from "./Screens/Home/components/TopDoctor";
import Cardiologists from "./Screens/Home/components/Cardiologists";
import SpecialistList from "./Screens/Home/components/SpecialistList";
import DoctorDetails from "./Screens/Home/components/DoctorDetails";
import BookAppointment from "./Screens/Appointments/BookAppointment";
import AppointmentHeader from "./Screens/Appointments/AppointmentHeader";
import CardSummery from "./Screens/Appointments/CardSummery";
import AddAddress from "./Screens/Appointments/AddAddress";
import AddressList from "./Screens/Appointments/AddressList";
import ProfileScreen from "./Screens/Appointments/ProfileScreen";
import MyAppointments from "./Screens/Appointments/MyAppointments";
import Tracking from "./Screens/Appointments/Tracking";
import SettingsScreen from "./Screens/Appointments/SettingsScreen";
import NotificationScreen from "./Screens/Appointments/NotificationScreen";
import MedicalRecords from "./Screens/Home/components/MedicalRecords";

const Stack = createStackNavigator();

function HomeStackNavigator(props) {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false, // Hide header for all screens in this tab navigator
			}}
		>
			<Stack.Screen name="HomeScreen" component={HomeScreen} />
			<Stack.Screen name="HeaderComponent" component={HeaderComponent} />
			<Stack.Screen name="DoctorsList" component={DoctorsList} />
			<Stack.Screen name="TopDoctorsList" component={TopDoctorsList} />
			<Stack.Screen name="TopDoctor" component={TopDoctor} />
			<Stack.Screen name="Cardiologist" component={Cardiologists} />
			<Stack.Screen name="SpecialistList" component={SpecialistList} />
			<Stack.Screen name="DoctorItem" component={DoctorItem} />
			<Stack.Screen name="DoctorDetails" component={DoctorDetails} />
			<Stack.Screen name="MedicalRecords" component={MedicalRecords} />

			{/* Appointments */}
			<Stack.Screen name="AppointmentHeader" component={AppointmentHeader} />
			<Stack.Screen name="BookAppointment" component={BookAppointment} />
			<Stack.Screen name="CardSummery" component={CardSummery} />
			<Stack.Screen name="AddAddress" component={AddAddress} />
			<Stack.Screen name="AddressList" component={AddressList} />
			<Stack.Screen name="ProfileScreen" component={ProfileScreen} />
			<Stack.Screen name="MyAppointments" component={MyAppointments} />
			<Stack.Screen name="Tracking" component={Tracking} />
			<Stack.Screen name="SettingsScreen" component={SettingsScreen} />
			<Stack.Screen name="NotificationScreen" component={NotificationScreen} />
		</Stack.Navigator>
	);
}

export default HomeStackNavigator;
