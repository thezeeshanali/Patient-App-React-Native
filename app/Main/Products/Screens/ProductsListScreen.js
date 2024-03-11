import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
	Text,
	TouchableOpacity,
	View,
	StyleSheet,
	Dimensions,
} from "react-native";
const windowWidth = Dimensions.get("window").width;
import * as SecureStore from "expo-secure-store";
import { useGlobalContext } from "../../../Context/ContextProvider";
import { Ionicons } from "@expo/vector-icons";

function ProductsListScreen(props) {
	const { user, setUser } = useGlobalContext();
	const navigation = useNavigation();

	const Logout = async () => {
		try {
			await SecureStore.deleteItemAsync("user_session");
			setUser(null);
			console.log("Data removed successfully.");
		} catch (error) {
			console.error("Error removing data:", error);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={{ fontWeight: "700", fontSize: 20 }}>Profile Options</Text>
			<View style={{ flex: 0.5, paddingVertical: 30 }}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.navigate("ProfileForm")}
				>
					<Ionicons name="ios-person" size={24} color="#fff" />
					<Text style={styles.buttonText}>Edit Profile</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.navigate("MyAppointments")}
				>
					<Ionicons name="ios-calendar" size={24} color="#fff" />
					<Text style={styles.buttonText}>Appointments</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.button} onPress={Logout}>
					<Ionicons name="ios-log-out" size={24} color="#fff" />
					<Text style={styles.buttonText}>Logout</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

export default ProductsListScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
	},
	button: {
		// width: windowWidth - 140,
		// height: 45,
		backgroundColor: "#4BBDE5",
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 15,
		padding: 10,
	},
	buttonText: {
		fontSize: 14,
		fontWeight: "600",
		lineHeight: 21,
		letterSpacing: 0,
		color: "white",
	},
});
