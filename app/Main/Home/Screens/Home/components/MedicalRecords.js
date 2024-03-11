import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { useQuery } from "@apollo/client";
import medicalrecordsGQL from "../../../../../gql/medicalrecords";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useGlobalContext } from "../../../../../Context/ContextProvider";

const MedicalRecords = ({ route }) => {
	const navigation = useNavigation();
	const { appointmentId } = route.params;

	const { appointmentData, setAppointmentData, setAppLoader } =
		useGlobalContext();

	const { loading, error, data, refetch } = useQuery(
		medicalrecordsGQL.GET_MED_RECORDS,
		{
			variables: {
				input: { appointmentId: appointmentId },
			},
		}
	);
	console.log("idddddd", appointmentId);

	console.log("dattttaaa", data?.getMedRecords?.data);

	if (loading) {
		return <Text style={{ padding: 20, textAlign: "center" }}>Loading...</Text>;
	}

	if (error) {
		return (
			<Text style={{ padding: 20, textAlign: "center" }}>
				Error: {error.message}
			</Text>
		);
	}

	const medRecords = data?.getMedRecords?.data || [];

	// Reverse the medRecords array to show the most recent records at the top
	const reversedMedRecords = [...medRecords].reverse();

	// Group records by created date
	const recordsByDate = {};
	reversedMedRecords.forEach((record) => {
		const createdDate = new Date(record.createdAt).toDateString();
		if (!recordsByDate[createdDate]) {
			recordsByDate[createdDate] = [];
		}
		recordsByDate[createdDate].push(record);
	});

	const renderMedRecordItem = ({ item, index }) => {
		const {
			id,
			appointmentId,
			patientId,
			medicalHistory,
			currentMedications,
			bp,
			pulseRate,
			respRate,
			temp,
			chiefComplaints,
			examination,
			diagnosis,
			medications,
			procedures,
			requireFollowUp,
			followUpDates,
			isReferred,
			referData,
			note,
			attachments,
			createdAt,
			updatedAt,
		} = item;

		return (
			<View style={styles.medContainer}>
				<Text style={styles.header}>Medical Record # {index + 1}</Text>
				{/* <View style={styles.row}>
					<Text style={[styles.field, { fontWeight: "600" }]}>
						Appointment ID:
					</Text>
					<Text style={styles.field}>{appointmentId}</Text>
				</View>
				<View style={styles.row}>
					<Text style={[styles.field, { fontWeight: "600" }]}>Patient ID:</Text>
					<Text style={styles.field}>{patientId}</Text>
				</View> */}
				<View style={styles.row}>
					<View style={styles.row}>
						<Text style={[styles.field, { fontWeight: "600" }]}>
							Blood Pressure:
						</Text>
						<Text style={[styles.field, { textTransform: "uppercase" }]}>
							{bp?.value} {bp?.unit}
						</Text>
					</View>
					<View style={styles.row}>
						<Text style={[styles.field, { fontWeight: "600" }]}>
							Temperature:
						</Text>
						<Text style={[styles.field, { textTransform: "uppercase" }]}>
							{temp?.value} {temp?.unit}
						</Text>
					</View>
				</View>
				<View style={styles.row}>
					<View style={styles.row}>
						<Text style={[styles.field, { fontWeight: "600" }]}>
							Respiratory Rate:
						</Text>
						<Text style={[styles.field, { textTransform: "uppercase" }]}>
							{respRate?.value} {respRate?.unit}
						</Text>
					</View>

					<View style={styles.row}>
						<Text style={[styles.field, { fontWeight: "600" }]}>
							Pulse Rate:
						</Text>
						<Text style={[styles.field, { textTransform: "uppercase" }]}>
							{pulseRate?.value} {pulseRate?.unit}
						</Text>
					</View>
				</View>
				<View style={styles.row}>
					<View>
						<Text style={[styles.field, { fontWeight: "600" }]}>
							Diagnosis:
						</Text>
						<Text style={styles.field}>{diagnosis}</Text>
					</View>
				</View>

				<View>
					<Text style={[styles.field, { fontWeight: "600" }]}>
						Examination:
					</Text>
					<Text style={styles.field}>{examination}</Text>
				</View>

				<View>
					<View>
						<Text style={[styles.field, { fontWeight: "600" }]}>
							Medical History:
						</Text>
						<Text style={styles.field}>{medicalHistory}</Text>
					</View>
					<View>
						<Text style={[styles.field, { fontWeight: "600" }]}>
							Current Medications:
						</Text>
						<Text style={styles.field}>{currentMedications}</Text>
					</View>
				</View>

				{chiefComplaints?.length == 0 ? (
					<View style={styles.row}>
						<Text style={[styles.field, { fontWeight: "600" }]}>
							Chief Complaints:
						</Text>
						<Text style={styles.field}>{chiefComplaints.text}</Text>
					</View>
				) : (
					<></>
				)}
				{/* <View style={{styles.row}}>
						<Text style={[styles.field, { fontWeight: "600" }]}>Referred:</Text>
						<Text style={styles.field}>{isReferred ? "Yes" : "No"}</Text>
					</View> */}
				<View>
					{isReferred && (
						<View>
							<Text style={[styles.field, { fontWeight: "600" }]}>
								Reffered Recommendations:
							</Text>
							<Text style={styles.field}>{referData.recommendations}</Text>
						</View>
					)}
				</View>

				<View style={styles.row}>
					{/* <View>
						<Text style={[styles.field, { fontWeight: "600" }]}>
							Require Follow Up:
						</Text>
						<Text style={styles.field}>{requireFollowUp ? "Yes" : "No"}</Text>
					</View> */}
					<View>
						<Text style={[styles.field, { fontWeight: "600" }]}>
							Follow Up Dates:
						</Text>
						<Text style={styles.field}>{followUpDates.join(" , ")}</Text>
					</View>
				</View>
				{/* <View>
					{isReferred && (
						<View style={styles.row}>
							<Text style={[styles.field, { fontWeight: "600" }]}>
								Referred To Provider:
							</Text>
							<Text style={styles.field}>{referData.providerId}</Text>
						</View>
					)}
				</View> */}
				<View>
					<Text style={[styles.field, { fontWeight: "600" }]}>Note: </Text>
					<Text style={styles.field}>{note}</Text>
				</View>
				<View>
					{attachments?.map((attachment, index) => (
						<View key={index}>
							<Text style={[styles.field, { fontWeight: "600" }]}>
								Attachment {index + 1}:
							</Text>
							<Text style={styles.field}>{attachment.name}</Text>
						</View>
					))}
				</View>
				<View style={styles.row}>
					<Text style={[styles.field, { fontWeight: "600" }]}>
						Created Date:{" "}
					</Text>
					<Text style={styles.field}>
						{new Date(createdAt).toISOString().split("T")[0]}
					</Text>
				</View>
			</View>
		);
	};

	return (
		<>
			<View style={styles.container}>
				<View
					style={{
						flexDirection: "row",
						marginVertical: 20,
						alignItems: "center",
					}}
				>
					<TouchableOpacity
						style={{ borderWidth: 0.5, borderColor: "#00000024", padding: 5 }}
						onPress={() => navigation.goBack()}
					>
						<Entypo name="chevron-small-left" size={30} color="black" />
					</TouchableOpacity>

					<Text
						style={{
							fontSize: 20,
							fontWeight: "800",
							color: "#000",
							left: 100,
						}}
					>
						Medical Records
					</Text>
				</View>

				<View style={{ flex: 1 }}>
					{reversedMedRecords?.length === 0 ? (
						<Text
							style={{ textAlign: "center", fontSize: 18, fontWeight: "500" }}
						>
							No medical records found
						</Text>
					) : (
						<FlatList
							data={reversedMedRecords}
							keyExtractor={(item) => item.id.toString()}
							renderItem={renderMedRecordItem}
							showsVerticalScrollIndicator={false}
						/>
					)}
				</View>
			</View>
		</>
	);
};

export default MedicalRecords;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: "center",
		// alignItems: "center",
		backgroundColor: "white",
		padding: 20,
	},
	medContainer: {
		padding: 12,
		marginBottom: 16,
		elevation: 3,
		borderWidth: 1,
		borderColor: "#ddd",
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	header: {
		fontSize: 18,
		fontWeight: "bold",
		backgroundColor: "#9869AD",
		padding: 12,
		color: "#fff",
		textAlign: "center",
		marginTop: 6,
	},
	field: {
		fontSize: 16,
		marginVertical: 5,
		paddingVertical: 2,
		paddingHorizontal: 10,
	},
});
