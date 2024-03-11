import { Text } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useGlobalContext } from "../../../../../Context/ContextProvider";

function HeaderComponent(props) {
	const { setAppLoader, user } = useGlobalContext();
	console.log("???????", user);
	const navigation = useNavigation();
	return (
		<>
			<View style={styles.container}>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<FontAwesome
						name="user-circle-o"
						size={54}
						color="#CCCCCC"
						style={{ marginTop: 30 }}
					/>
					<View style={{ marginLeft: 20, marginTop: 28 }}>
						<Text style={{ fontSize: 18, fontWeight: "400" }}>
							Good Morning
						</Text>
						<Text style={{ fontSize: 20, fontWeight: "600" }}>
							{user?.firstName} {user?.lastName}
						</Text>
					</View>
					<TouchableOpacity style={styles.bellButton}>
						<Ionicons name="md-notifications-outline" size={28} color="black" />
					</TouchableOpacity>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		padding: 20,
		marginTop: 0,
		// justifyContent: "center",
		// alignItems: "center",
		backgroundColor: "white",
	},
	bellButton: {
		borderWidth: 0.5,
		borderColor: "#00000024",
		position: "absolute",
		right: 20,
		padding: 3,
		bottom: 10,
		borderRadius: 5,
	},
});

export default HeaderComponent;
