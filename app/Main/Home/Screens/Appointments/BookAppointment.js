import React, { useEffect, useState } from "react";
import {
	Text,
	View,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import moment from "moment";
import AppoinmentModal from "./AppoinmentModal";
import AppointmentHeader from "./AppointmentHeader";
import { useQuery, useMutation } from "@apollo/client";
import docGQL from "../../gql/home";
import { useRoute } from "@react-navigation/native";
import appointmentsGQL from "../../../../gql/appointments";
import { useGlobalContext } from "../../../../Context/ContextProvider";

const windowWidth = Dimensions.get("window").width;
LocaleConfig.locales["en"] = {
	monthNames: [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	],
	monthNamesShort: [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	],
	dayNames: [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	],
	dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};

LocaleConfig.defaultLocale = "en";

export default function BookAppointment({ doctorId }) {
	const { appointmentData, setAppointmentData, setAppLoader, setApptId } =
		useGlobalContext();

	const onSuccessfulRequestResponse = (data) => {
		// openModal();
		// setAppLoader(true);
		console.log("Appt success data :: ", data?.createAppointment?.data?.id);
		// setApptId(data?.createAppointment?.data?.id);
	};

	const onResponseError = (error) => {
		console.log("error :: ", error);
	};

	const [addAppointment, { data, loading, error }] = useMutation(
		appointmentsGQL.ADD_APPOINTMENT,
		{
			update(proxy, result) {
				onSuccessfulRequestResponse(result.data);
			},
			onError(error) {
				onResponseError(error);
			},
		}
	);

	const [isModalVisible, setIsModalVisible] = useState(false);
	const route = useRoute();
	const [doctorDetails, setDoctorDetails] = useState(route.params.doctorId);
	// console.log('doctorId',doctorDetails)
	const [emptySlot, setEmptySlot] = useState(false);

	// console.log(doctorDetails);
	const [currentDate, setCurrentDate] = useState(moment());
	const [rosterID, setRosterID] = useState("");
	const minDate = moment().startOf("month").subtract(1, "month").toDate();
	const maxDate = moment().endOf("month").add(1, "month").toDate();
	const careTeamIdId = doctorDetails;
	const [fromDate, setFromDate] = useState(
		currentDate.toISOString().substring(0, 10)
	);
	const [toDate, setToDate] = useState(
		currentDate.toISOString().substring(0, 10)
	);

	//to get first and last date of month in format like "2023-10-15" in JS
	function getFormattedDate(date) {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	}

	function getFirstAndLastDateOfMonth() {
		const today = new Date();
		const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
		const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

		const formattedFirstDay = getFormattedDate(firstDay);
		const formattedLastDay = getFormattedDate(lastDay);

		return { formattedFirstDay, formattedLastDay };
	}

	const { formattedFirstDay, formattedLastDay } = getFirstAndLastDateOfMonth();

	//end

	const {
		loading: loadingDoctors,
		error: errorDoctors,
		data: doctorsData,
		refetch: refetchDoctors,
	} = useQuery(docGQL.GET_ROSTER, {
		variables: {
			input: {
				careTeamId: careTeamIdId,
				fromDate: formattedFirstDay,
				toDate: formattedLastDay,
			},
		},
	});
	// console.log("roterrrrr", doctorsData?.getRosters?.data);

	// console.log('rosteridddddddd',rosterID);

	const {
		loading: loadingRosters,
		error: errorRosters,
		data: rostersData,
		refetch: refetchRosters,
	} = useQuery(docGQL.GET_ROSTER_BY_ID, {
		variables: { id: rosterID },
	});
	// console.log("rostersData", rostersData);
	// console.log('errorrrrrr',errorRosters);

	const openModal = () => {
		setIsModalVisible(true);
		console.log("opennnnnnn");
	};

	const closeModal = () => {
		setIsModalVisible(false);
		console.log("closeeeee");
	};

	const [activeTime, setActiveTime] = useState(null);

	const slots = rostersData?.getRoster?.data?.slots;

	let timings;

	if (slots?.length > 0) {
		timings = slots?.map((slot) => {
			const startTimeInSeconds = slot.startTime; // Assuming startTime is in seconds
			const endTimeInSeconds = slot.endTime; // Assuming endTime is in seconds

			// Convert seconds to HH:mm AM/PM format
			const startTime = secondsToTime(startTimeInSeconds);
			const endTime = secondsToTime(endTimeInSeconds);

			return `${startTime}`;
		});
	} else {
		// If no slots are available, set 'timings' to a message
		timings = ["No slots available"];
	}

	// Function to convert seconds to HH:mm AM/PM format
	function secondsToTime(seconds) {
		const date = new Date(0);
		date.setSeconds(seconds);
		return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
	}

	// console.log(timings);

	const handleTimeSelection = (slot) => {
		setAppointmentData((obj) => ({
			...obj,
			startTime: slot?.startTime,
			endTime: slot?.endTime,
			rosterId: rostersData?.getRoster?.data?.roster?.id,
		}));

		setActiveTime(`${secondsToTime(slot.startTime)}`);
	};

	const handleDayPress = (day) => {
		const selectedDate = moment(day.dateString).format("YYYY-MM-DD");

		// Check if the selected date has empty slots
		const selectedRoster = doctorsData?.getRosters?.data?.find((roster) => {
			return (
				moment(roster.date).format("YYYY-MM-DD") === selectedDate &&
				roster.hasEmptySlot
			);
		});

		if (selectedRoster) {
			// Set the roster ID for the selected date
			console.log("selecteddddddd", selectedRoster.id);
			setRosterID(selectedRoster.id);
			setEmptySlot(true);
		} else {
			setRosterID(""); // No empty slots, clear the roster ID
			setEmptySlot(false);
		}

		setCurrentDate(moment(day.dateString));
	};

	// Function to get the range of dates for the current month
	function getMonthDateRange(year, month) {
		const startDate = new Date(year, month, 1);
		const endDate = new Date(year, month + 1, 0);

		const dates = [];
		for (
			let date = startDate;
			date <= endDate;
			date.setDate(date.getDate() + 1)
		) {
			dates.push(new Date(date));
		}

		return dates;
	}

	// Function to filter specific dates from the given array of dates
	function filterSpecificDates(allDates, specificDates) {
		const formattedSpecificDates = specificDates?.map(
			(dateString) => new Date(dateString)
		);

		return allDates.filter((date) =>
			formattedSpecificDates?.some((specDate) => {
				return (
					specDate.getFullYear() === date.getFullYear() &&
					specDate.getMonth() === date.getMonth() &&
					specDate.getDate() === date.getDate()
				);
			})
		);
	}

	// Get the current year and month
	const today = new Date();
	const currentYear = today.getFullYear();
	const currentMonth = today.getMonth();

	// Get all dates for the current month
	const allDatesForCurrentMonth = getMonthDateRange(currentYear, currentMonth);

	// Example specific dates
	const specificDates = doctorsData?.getRosters?.data?.map((item) => {
		return item.date;
	});

	// Filter specific dates from the current month's dates
	const filteredDates = filterSpecificDates(
		allDatesForCurrentMonth,
		specificDates
	);

	const formattedDatesObject = filteredDates.reduce((obj, date) => {
		const formattedDate = date.toISOString().split("T")[0];
		obj[formattedDate] = {
			selected: true,
			marked: true,
			selectedColor: "orange",
			dotColor: "#ff7f50 ",
		};
		return obj;
	}, {});

	// console.log("All Dates for Current Month:", allDatesForCurrentMonth);
	// console.log("Filtered Dates:", filteredDates);
	// console.log("Specific Dates:", specificDates);

	const bookAppointment = () => {
		//should add loader here
		let tempData = appointmentData;

		tempData.isForDependent = false;
		// tempData.dependentId = "";

		setAppLoader(false);
		addAppointment({ variables: { input: tempData } });
		openModal();
		console.log("appointment Data :: ", tempData);
	};

	return (
		<>
			<View style={styles.container}>
				<View style={[styles.wrapper, { flex: 0.2 }]}>
					<AppointmentHeader title={"Appointment"} />
				</View>
				<ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
					<View style={{ paddingHorizontal: 30 }}>
						<Text style={{ fontSize: 24, fontWeight: "800" }}>
							Select Your Date
						</Text>

						<View style={{ marginTop: 10 }}>
							<Calendar
								current={currentDate.format("YYYY-MM-DD")}
								minDate={minDate.toISOString().split("T")[0]}
								maxDate={maxDate.toISOString().split("T")[0]}
								onDayPress={handleDayPress}
								hideExtraDays={true}
								markedDates={{
									...formattedDatesObject,
									[currentDate.format("YYYY-MM-DD")]: {
										selected: true,
										marked: true,
										selectedColor: "#9869AD",
										dotColor: "#9869AD",
									},
								}}
							/>
						</View>
					</View>

					<View
						style={{
							paddingHorizontal: 30,
							flexDirection: "row",
							justifyContent: "space-evenly",
						}}
					>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<View
								style={{
									width: 15,
									height: 15,
									backgroundColor: "#9869AD",
									borderRadius: 50,
								}}
							></View>
							<Text style={{ fontSize: 18, marginLeft: 6 }}>Selected</Text>
						</View>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<View
								style={{
									width: 15,
									height: 15,
									backgroundColor: "orange",
									borderRadius: 50,
								}}
							></View>
							<Text style={{ fontSize: 18, marginLeft: 6 }}>Available</Text>
						</View>
					</View>

					<View style={styles.timesContainer}>
						<Text style={styles.heading}>Schedules</Text>
						{/* {loadingRosters ? (
              <Text style={{ marginVertical: 10, fontSize: 14 }}>
                Loading...
              </Text>
            ) : (
              <></>
            )} */}
						{errorRosters ? (
							<Text style={{ marginVertical: 10, fontSize: 10, color: "red" }}>
								{errorRosters.message}
							</Text>
						) : (
							<></>
						)}

						<View style={styles.timingsContainer}>
							{slots && slots.length > 0 ? (
								<View style={styles.timingsContainer}>
									{slots.map((slot, index) => (
										<View
											key={index}
											style={[
												styles.timingContainer,
												(index + 1) % 3 === 0 && styles.lastInRow,
											]}
										>
											<TouchableOpacity
												style={[
													styles.timing,
													activeTime === `${secondsToTime(slot.startTime)}` &&
														styles.activeTiming,
												]}
												onPress={() => handleTimeSelection(slot)}
											>
												<Text
													style={[
														styles.timingText,
														activeTime === `${secondsToTime(slot.startTime)}` &&
															styles.activeTimingText,
													]}
												>
													{`${secondsToTime(slot.startTime)}`}
												</Text>
											</TouchableOpacity>
										</View>
									))}
								</View>
							) : (
								<Text style={{ color: "#000", fontSize: 18 }}>
									No slots available
								</Text>
							)}
						</View>
					</View>
				</ScrollView>
				<View
					style={{
						alignItems: "center",
						flex: 0.2,
						justifyContent: "flex-end",
					}}
				>
					<TouchableOpacity style={styles.button} onPress={bookAppointment}>
						<Text style={styles.buttonText}>Book appointment</Text>
					</TouchableOpacity>
				</View>
			</View>
			<AppoinmentModal isVisible={isModalVisible} onClose={closeModal} />
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		// alignItems: "center",
		backgroundColor: "#fff",
	},
	wrapper: {
		flexDirection: "row",
		alignItems: "center",
	},
	timesContainer: {
		flex: 1,
		justifyContent: "center",
		// alignItems: 'center',
		padding: 20,
	},
	heading: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	timingsContainer: {
		flexDirection: "row", // Display times in a row
		flexWrap: "wrap", // Wrap to the next row when there's no space
	},
	timingContainer: {
		flexBasis: "33%", // Each time container takes up 33% of the row (3 times in a row)
		// alignItems: 'center', // Center times horizontally in the container
		marginBottom: 10, // Add spacing between rows
	},
	lastInRow: {
		marginRight: 0, // Remove right margin for the last time in a row
	},
	timing: {
		backgroundColor: "#fff",
		padding: 12,
		margin: 5,
		borderRadius: 5,
		borderWidth: 0.5,
		borderColor: "#00000050",
		alignItems: "center",
	},
	activeTiming: {
		backgroundColor: "#9869AD",
	},
	timingText: {
		fontSize: 16,
		// fontWeight: 'bold',
		color: "black",
	},
	activeTimingText: {
		fontSize: 16,
		// fontWeight: 'bold',
		color: "#fff",
	},
	button: {
		width: windowWidth - 40,
		height: 45,
		backgroundColor: "#4BBDE5",
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 15,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "600",
		lineHeight: 21,
		letterSpacing: 0,
		color: "white",
		textTransform: "uppercase",
	},
});
