import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import React, { useState } from "react";
import AppointmentHeader from "./AppointmentHeader";
import { TouchableOpacity } from "react-native";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useGlobalContext } from "../../../../Context/ContextProvider";
import appointments from "../../../../gql/appointments";
import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";

export default function MyAppointments() {
	const [activeTab, setActiveTab] = useState("UPCOMING");
	const { appointmentData, setAppointmentData, setAppLoader, user } =
		useGlobalContext();

	const navigation = useNavigation();

	const handleTabPress = (tabName) => {
		setActiveTab(tabName);
	};

	const patientId = appointmentData.patientId;
	const { loading, error, data, refetch } = useQuery(
		appointments.GET_ALL_APPOINTMENTS,
		{
			variables: {
				input: { patientId: patientId },
			},
		}
	);

	console.log(data);
	if (loading) {
		return <Text style={{ padding: 20, textAlign: "center" }}>Loading...</Text>;
	}

	if (error) {
		return <Text>Error: {error.message}</Text>;
	}

	const dummyData = [
		{
			doctorName: "Dr. Reyes",
			specialist: "Neur specialist",
			doctorImage: require("../Home/assets/doc.png"),
			date: "23/03/2023",
			time: "10:30 AM",
			status: "Confirmed",
		},
		{
			doctorName: "Dr. Reyes",
			specialist: "Neur specialist",
			doctorImage: require("../Home/assets/doc.png"),
			date: "23/03/2023",
			time: "10:30 AM",
			status: "Confirmed",
		},
		// Add more appointment data items here...
	];

	const AppointmentItem = ({ item }) => {
		return (
			<View
				style={{
					paddingVertical: 20,
					paddingHorizontal: 15,
					borderWidth: 0.3,
					borderColor: "#00000060",
					borderRadius: 10,
					marginBottom: 20,
				}}
			>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						// alignItems: "center",
						borderBottomWidth: 0.5,
						borderColor: "#00000050",
						paddingBottom: 20,
					}}
				>
					<View>
						<Text style={{ fontSize: 18, fontWeight: "600" }}>
							{item?.careTeamData?.firstName +
								" " +
								item?.careTeamData?.lastName}
						</Text>
						<Text
							style={{
								fontSize: 16,
								color: "#666666",
								textTransform: "capitalize",
								marginTop: 5,
							}}
						>
							{item?.purpose}
						</Text>
					</View>
					<View style={{}}>
						{/* <Image source={require("../Home/assets/doc.png")} /> */}
						<Text
							style={{
								fontSize: 16,
								color: "#666666",
								textTransform: "capitalize",
							}}
						>
							{item?.apptType}
						</Text>
					</View>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						marginVertical: 10,
					}}
				>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Ionicons name="calendar" size={20} color={"#9869AD"} />
						<Text style={{ fontSize: 14, color: "#000", marginLeft: 5 }}>
							{new Date(item?.createdAt).toLocaleDateString()}
						</Text>
					</View>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<AntDesign name="clockcircle" size={16} color={"#9869AD"} />
						<Text style={{ fontSize: 14, color: "#000", marginLeft: 5 }}>
							{new Date(item?.startTime).toLocaleTimeString()}
						</Text>
					</View>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Entypo
							name="dot-single"
							size={30}
							color={
								item?.status === "pending" ||
								item?.status === "cancelled" ||
								item?.status === "rescheduled"
									? "red"
									: "#38C976"
							}
						/>
						<Text style={{ fontSize: 14, color: "#000" }}>{item?.status}</Text>
					</View>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						marginTop: 20,
					}}
				>
					{/* <TouchableOpacity style={styles.cancelButton}>
						<Text style={styles.cancelButtonText}>CANCEL</Text>
					</TouchableOpacity> */}
					<View></View>

					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							navigation.navigate("MedicalRecords", { appointmentId: item.id });
						}}
					>
						<Text style={styles.buttonText}>Medical History</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	return (
		<>
			<View style={styles.container}>
				<View style={[styles.wrapper, { flex: 0.15 }]}>
					<AppointmentHeader title={"My Appointments"} showMoreButton={false} />
				</View>
				<View style={{ flex: 0.85, paddingHorizontal: 20 }}>
					{/* <View style={styles.buttonscontainer}>
            <TouchableOpacity
            style={[
                styles.tabButton,
                activeTab === 'COMPLETED' ? styles.activeTab : styles.inactiveTab,
            ]}
            onPress={() => handleTabPress('COMPLETED')}
            >
            <Text style={[styles.tabText,
                activeTab === 'COMPLETED' ? styles.activeTabText : styles.inactiveTabText,
            ]}>COMPLETED</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={[
                styles.tabButton,
                activeTab === 'UPCOMING' ? styles.activeTab : styles.inactiveTab,
            ]}
            onPress={() => handleTabPress('UPCOMING')}
            >
            <Text style={[styles.tabText,
                activeTab === 'UPCOMING' ? styles.activeTabText : styles.inactiveTabText,
            ]}>UPCOMING</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={[
                styles.tabButton,
                activeTab === 'CANCELED' ? styles.activeTab : styles.inactiveTab,
            ]}
            onPress={() => handleTabPress('CANCELED')}
            >
            <Text style={[styles.tabText,
                activeTab === 'CANCELED' ? styles.activeTabText : styles.inactiveTabText,
            ]}>CANCELED</Text>
            </TouchableOpacity>
        </View> */}
					<View style={{ margin: 10 }}>
						{/* <Text style={{fontSize:20,fontWeight:'800',marginVertical:10}}>Nearest Visit</Text> */}
						{data?.getAppts?.data === null ? (
							<Text
								style={{ textAlign: "center", fontSize: 18, fontWeight: "500" }}
							>
								No Appointments found
							</Text>
						) : (
							<FlatList
								data={data?.getAppts?.data}
								renderItem={({ item }) => <AppointmentItem item={item} />}
								keyExtractor={(item, index) => index.toString()}
								showsVerticalScrollIndicator={false}
								style={{ marginBottom: 10 }}
							/>
						)}
					</View>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		// alignItems: 'center',
		backgroundColor: "#fff",
	},
	wrapper: {
		flexDirection: "row",
		alignItems: "center",
	},
	buttonscontainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 10,
		width: "100%",
	},
	tabButton: {
		flex: 1,
		paddingVertical: 20,
		alignItems: "center",
	},
	tabText: {
		fontSize: 16,
	},
	activeTab: {
		backgroundColor: "#9869AD",
	},
	inactiveTab: {
		backgroundColor: "#F7F7F7",
	},
	activeTabText: {
		color: "white",
	},
	inactiveTabText: {
		color: "#AAAAAA",
	},
	button: {
		backgroundColor: "#4BBDE5",
		paddingVertical: 14,
		paddingHorizontal: 20,
		borderRadius: 5,
		// marginLeft: 10,
	},
	cancelButton: {
		backgroundColor: "#fff",
		paddingVertical: 14,
		paddingHorizontal: 20,
		borderRadius: 5,
		// marginRight: 10,
		borderWidth: 1,
		borderColor: "#9869AD",
	},
	cancelButtonText: {
		color: "#000",
		fontSize: 18,
		// fontWeight: 'bold',
	},
	buttonText: {
		color: "white",
		fontSize: 18,
	},
});
