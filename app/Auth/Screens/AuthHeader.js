// Header.js
import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	KeyboardAvoidingView,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AuthHeader = ({ title, showBackButton = true }) => {
	const navigation = useNavigation();

	const handleBackPress = () => {
		navigation.goBack();
	};

	return (
		<>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					paddingHorizontal: 20,
				}}
			>
				<View style={{}}>
					{showBackButton && (
						<TouchableOpacity
							style={styles.backButton}
							onPress={handleBackPress}
						>
							<Entypo name="chevron-small-left" size={30} color="black" />
						</TouchableOpacity>
					)}
				</View>
				<View style={{ flex: 1, alignItems: "center" }}>
					<Text style={styles.titleText}>{title}</Text>
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 18,
		color: "#000",
		marginLeft: 16,
	},
	backButton: {
		marginRight: 10,
		borderWidth: 0.5,
		borderColor: "#00000024",
		padding: 5,
	},
	titleText: {
		fontSize: 22,
		fontWeight: "500",
		// marginLeft: 100,
	},
});

export default AuthHeader;
