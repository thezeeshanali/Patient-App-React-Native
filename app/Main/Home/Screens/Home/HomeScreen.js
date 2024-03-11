import React, { useState, useEffect } from "react";
import {
	Alert,
	View,
	Text,
	FlatList,
	Image,
	StyleSheet,
	StatusBar,
	Dimensions,
	TouchableOpacity,
	TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import this hook
import docGQL from "../../gql/home";
import api from "../../../../api/mainCategories";
import axios from "axios";
import { useGlobalContext } from "../../../../Context/ContextProvider";
import HeaderComponent from "./components/HeaderComponent";
import {
	MaterialIcons,
	Fontisto,
	FontAwesome5,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import DoctorsList from "./components/DoctorsList";
import TopDoctorsList from "./components/TopDoctorList";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "@apollo/client";
import * as SecureStore from "expo-secure-store";

const data = [{ id: 1 }];

function HomeScreen(props) {
	const { setAppLoader, user, setUser } = useGlobalContext();
	const navigation = useNavigation();

	const [activeButton, setActiveButton] = useState("appointments");
	const [activeSpecialist, setActiveSpecialist] = useState("specialist");

	const handlePress = (button) => {
		setActiveButton(button);
		if (button === "appointments") {
			navigation.navigate("MyAppointments");
		}
	};
	const handlePressSpecialist = (specialist) => {
		setActiveSpecialist(specialist);
		// navigation.navigate("Cardiologist");
	};

	const renderIcon = (button, isActive) => {
		const iconColor = isActive ? "white" : "#000";
		switch (button) {
			case "appointments":
				return (
					<Fontisto
						// style={{ marginHorizontal: 5 }}
						name="doctor"
						size={16}
						color={iconColor}
					/>
				);
			case "previousVisits":
				return (
					<MaterialIcons
						// style={{ paddingHorizontal: 5 }}
						name="local-pharmacy"
						size={16}
						color={iconColor}
					/>
				);
			case "tracking":
				return (
					<MaterialIcons
						// style={{ marginHorizontal: 5 }}
						name="location-city"
						size={16}
						color={iconColor}
					/>
				);
			default:
				return null;
		}
	};

	const renderIconSpecialist = (specialist, isActiveSpecialist) => {
		const iconSpecialistColor = isActiveSpecialist ? "white" : "#000";
		switch (specialist) {
			case "pathologist":
				return (
					<Fontisto
						style={{ marginHorizontal: 5 }}
						name="doctor"
						size={28}
						color={iconSpecialistColor}
					/>
				);
			case "dentist":
				return (
					<MaterialCommunityIcons
						style={{ marginHorizontal: 5 }}
						name="tooth-outline"
						size={28}
						color={iconSpecialistColor}
					/>
				);
			case "cardiologist":
				return (
					<FontAwesome5
						style={{ marginHorizontal: 5 }}
						name="heartbeat"
						size={28}
						color={iconSpecialistColor}
					/>
				);
			default:
				return null;
		}
	};

	const renderItem = ({ item }) => {
		return (
			<View style={styles.container}>
				<View style={styles.searchContainer}>
					<View style={styles.searchBox}>
						<MaterialIcons
							name="search"
							size={28}
							color="black"
							style={styles.searchIcon}
						/>
						<TextInput
							style={styles.searchInput}
							placeholder="Find your doctor...."
							placeholderTextColor="gray"
						/>
					</View>
					<TouchableOpacity>
						<Image
							source={require("../Home/assets/filter.png")}
							resizeMode="contain"
						/>
					</TouchableOpacity>
				</View>

				{/* Services */}
				<View style={styles.buttonContainer}>
					{["appointments", "previousVisits", "tracking"].map((button) => (
						<TouchableOpacity
							key={button}
							style={[
								styles.button,
								activeButton === button && { backgroundColor: "#4BBDE5" },
							]}
							onPress={() => handlePress(button)}
						>
							{renderIcon(button, activeButton === button)}
							<Text
								style={[
									styles.buttonText,
									activeButton === button && { color: "white" },
								]}
							>
								{button.charAt(0).toUpperCase() + button.slice(1)}
							</Text>
						</TouchableOpacity>
					))}
				</View>

				{/* Banner */}
				<View
					style={{
						marginTop: 20,
						padding: 5,
						marginHorizontal: 10,
						height: 260,
					}}
				>
					<Swiper
						style={styles.wrapper}
						activeDotColor={"#9869AD"}
						dotStyle={{
							// position: "relative",
							// top: 12,
							backgroundColor: "#fff",
							borderWidth: 1,
							borderColor: "#00000030",
						}}
						// activeDotStyle={{ position: "relative", top: 16 }}
						showsButtons={false}
					>
						<View style={styles.slide}>
							<Image
								style={{ width: 300, height: 170 }}
								source={require("../Home/assets/banner.png")}
							/>
						</View>
						<View style={styles.slide}>
							<Image
								style={{ width: 300, height: 170 }}
								source={require("../Home/assets/banner.png")}
							/>
						</View>
						<View style={styles.slide}>
							<Image
								style={{ width: 300, height: 170 }}
								source={require("../Home/assets/banner.png")}
							/>
						</View>
					</Swiper>
				</View>

				{/* Specialists */}
				<View style={styles.header}>
					<Text style={styles.heading}>Categories</Text>
					<TouchableOpacity>
						<Text style={styles.viewAll}>View All</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.specialistButtonContainer}>
					{["pathologist", "dentist", "cardiologist"].map((specialist) => (
						<TouchableOpacity
							key={specialist}
							style={[
								styles.specialistButton,
								activeSpecialist === specialist && {
									backgroundColor: "#4BBDE5",
								},
							]}
							onPress={() => handlePressSpecialist(specialist)}
						>
							{renderIconSpecialist(
								specialist,
								activeSpecialist === specialist
							)}
							<Text
								style={[
									styles.specialistButtonText,
									activeSpecialist === specialist && { color: "white" },
								]}
							>
								{specialist.charAt(0).toUpperCase() + specialist.slice(1)}
							</Text>
						</TouchableOpacity>
					))}
				</View>

				<View style={{ marginTop: 30 }}>
					<DoctorsList />
				</View>
				{/* <View style={{}}>
					<TopDoctorsList />
				</View> */}
			</View>
		);
	};

	return (
		<FlatList
			ListHeaderComponent={<HeaderComponent />}
			data={data}
			renderItem={renderItem}
			keyExtractor={(item) => item.id.toString()} // Use your key extractor logic
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: "center",
		// alignItems: "center",
		backgroundColor: "white",
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingTop: 5,
	},
	searchBox: {
		flexDirection: "row",
		alignItems: "center",
		// backgroundColor: '#f0f0f0',
		borderRadius: 3,
		flex: 1,
		marginRight: 10,
		borderWidth: 0.8,
		borderColor: "#00000025",
		padding: 8,
	},
	searchIcon: {
		marginLeft: 4,
	},
	searchInput: {
		flex: 1,
		paddingHorizontal: 10,
		fontSize: 18,
	},
	filterButton: {
		backgroundColor: "#9869AD",
		borderRadius: 8,
		borderWidth: 0.8,
		borderColor: "#00000024",
		padding: 10,
		justifyContent: "center",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		marginTop: 20,
	},
	button: {
		flex: 1,
		alignItems: "center",
		paddingVertical: 12,
		paddingHorizontal: 5,
		backgroundColor: "white",
		borderWidth: 1,
		borderColor: "#00000010",
		borderRadius: 5,
		marginHorizontal: 2,
		flexDirection: "row",
		justifyContent: "center",
	},
	buttonText: {
		color: "#000",
		fontSize: 12,
		marginLeft: 2,
	},
	specialistButtonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 10,
		marginTop: 10,
	},
	specialistButton: {
		flex: 1,
		alignItems: "center",
		paddingVertical: 10,
		// paddingHorizontal:10,
		backgroundColor: "white",
		borderWidth: 1,
		borderColor: "#00000010",
		borderRadius: 5,
		marginHorizontal: 5,
	},
	specialistButtonText: {
		color: "#000",
		fontSize: 14,
		marginTop: 4,
	},
	slide: {
		// flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	wrapper: {},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		marginBottom: 10,
	},
	heading: {
		fontSize: 22,
		fontWeight: "bold",
	},
	viewAll: {
		color: "#9869AD",
		fontSize: 18,
		fontWeight: "500",
	},
});
export default HomeScreen;
