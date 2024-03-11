import React, { useState, useEffect } from "react";
import { Modal, Text, View, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ProfileModal = ({ isVisible, onClose }) => {
	const [visible, setVisible] = useState(isVisible);
	const navigation = useNavigation();

	// Close the modal after 3 seconds
	useEffect(() => {
		if (isVisible) {
			const timer = setTimeout(() => {
				navigation.navigate("HomeScreen");
			}, 5000);

			return () => clearTimeout(timer);
		}
	}, [isVisible, onClose]);

	useEffect(() => {
		setVisible(isVisible);
	}, [isVisible]);

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={onClose}
		>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<Ionicons
						name="ios-checkmark-circle-outline"
						size={64}
						color="#9869AD"
					/>
					<Text style={styles.congratsText}>Congratulations!</Text>
					<Text style={styles.messageText}>
						Your account is ready to use. You will be redirected to the Home
						page in a few seconds.
					</Text>
					<TouchableOpacity
						style={styles.button}
						onPress={() => navigation.navigate("HomeScreen")}
					>
						<Text style={styles.buttonText}>BACK TO HOMEPAGE</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

const styles = {
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		backgroundColor: "white",
		padding: 20,
		borderRadius: 10,
		alignItems: "center",
		margin: 20,
		height: 300,
	},
	congratsText: {
		fontSize: 24,
		fontWeight: "bold",
		marginTop: 10,
	},
	messageText: {
		fontSize: 16,
		textAlign: "center",
		marginTop: 10,
		paddingHorizontal: 20,
	},
	button: {
		backgroundColor: "#4BBDE5",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
		marginTop: 20,
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
};

export default ProfileModal;
