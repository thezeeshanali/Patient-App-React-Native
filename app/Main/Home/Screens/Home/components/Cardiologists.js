import { Entypo } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import react, { useState } from "react";
import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	ScrollView,
} from "react-native";
import SpecialistList from "./SpecialistList";
import docGQL from "../../../gql/home";
import { useQuery } from "@apollo/client";

function Cardiologists({ navigation }) {
	const roleId = "01b52de4-c67a-4e83-9a8d-105debb66224";

	const {
		loading: loadingDoctors,
		error: errorDoctors,
		data: doctorsData,
		refetch: refetchDoctors,
	} = useQuery(docGQL.GET_DOCTORS, {
		variables: { input: { roleId: roleId } },
	});

	const total = doctorsData?.getUsers?.data
		? Object.keys(doctorsData.getUsers.data).length
		: 0;

	return (
		<>
			{/* <StatusBar barStyle="dark-content" /> */}
			<SafeAreaView style={styles.container}>
				<View style={[styles.wrapper, { flex: 1 / 4 }]}>
					<View style={{ flex: 0.3, alignItems: "flex-start" }}>
						<TouchableOpacity
							style={styles.backButton}
							onPress={() => navigation.goBack()}
						>
							<Entypo name="chevron-small-left" size={32} color="black" />
						</TouchableOpacity>
					</View>
					<View style={{ flex: 0.6 }}>
						<Text style={styles.signUpText}>Available Doctors</Text>
					</View>
					<TouchableOpacity style={{}}>
						<Image
							source={require("../assets/more.png")}
							resizeMode="contain"
						/>
					</TouchableOpacity>
				</View>

				<View style={{ marginHorizontal: 16, flex: 0.08, bottom: 26 }}>
					<Text style={{ color: "#000", fontSize: 20, fontWeight: "400" }}>
						Showing {total} specialists
					</Text>
				</View>
				<View style={{ paddingHorizontal: 20, flex: 0.9 }}>
					<SpecialistList doctor={doctorsData?.getUsers?.data} />
				</View>
			</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		//   alignItems: "center",
		backgroundColor: "white",
	},
	wrapper: {
		flexDirection: "row",
		alignItems: "center",
	},
	backButton: {
		borderWidth: 0.5,
		borderColor: "#00000024",
		marginLeft: 15,
	},
	signUpText: {
		fontSize: 24,
		fontWeight: "700",
	},
});

export default Cardiologists;
