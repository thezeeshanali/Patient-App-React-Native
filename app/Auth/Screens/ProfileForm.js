import React, { useState } from "react";
import {
	Alert,
	Button,
	Dimensions,
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Text,
	StatusBar,
	TextInput,
	TouchableOpacity,
	Image,
} from "react-native";
import { Formik, setFieldValue } from "formik";
import * as yup from "yup";
import * as SecureStore from "expo-secure-store";
import { Ionicons, Entypo, FontAwesome5 } from "@expo/vector-icons";
import authApi from "../../api/auth";
import { useGlobalContext } from "../../Context/ContextProvider";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import ProfileModal from "./ProfileModal";
import AuthHeader from "./AuthHeader";
import auth from "../../gql/auth";
import { useMutation, useQuery } from "@apollo/client";
import { CheckBox } from "react-native-elements";

const windowWidth = Dimensions.get("window").width;
function ProfileForm({ props, navigation }) {
	const { user, setUser, setAppLoader } = useGlobalContext();
	const [image, setImage] = useState(null);
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState([
		{ label: "Male", value: "male" },
		{ label: "Female", value: "female" },
	]);

	const [openDocumentType, setOpenDocumentType] = useState(false);
	const [documentTypeValue, setDocumentTypeValue] = useState(null);
	const [documentType, setDocumentType] = useState([
		{ label: "Iqama", value: "iqama" },
		{ label: "Visa", value: "visa" },
		{ label: "Passport", value: "passport" },
	]);

	const [selectedDate, setSelectedDate] = useState(new Date());
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);

	const openModal = () => {
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
	};

	const handleDateChange = (event, date) => {
		if (date !== undefined) {
			setSelectedDate(date);
		}
		setShowDatePicker(false);
	};

	const openDatePicker = () => {
		setShowDatePicker(true);
	};

	const pickImage = async () => {
		console.log("image picker is called :: ");
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};
	const profileSchema = yup.object().shape({
		primMobile: yup
			.string()
			.required("Phone Number is required")
			.matches(/^[5][0-9]{0,8}$/, {
				message: "Invalid mobile number format. It should start with 5.",
				excludeEmptyString: true,
			}),
		password: yup
			.string()
			.min(6, "Password must be at least 6 characters")
			.required("Password is required"),

		firstName: yup.string().required("First Name is required"),
		lastName: yup.string().required("Last Name is required"),
		dob: yup.string().required("Date of Birth is required"),
		gender: yup.string().required("Gender is required"),
		email: yup.string().email("Invalid email"),
	});

	const [updateUser, { data, loading, error }] = useMutation(
		auth.UPDATE_USER_INFO,
		{
			onCompleted: (data) => {
				// Handle successful response
				// onSuccessfulRequestResponse(data);
				openModal();
			},
			onError: (error) => {
				// Handle error response
				console.log("Mutation error:", error);
				const errorsArray = Array.isArray(error) ? error : [error];

				if (errorsArray.length > 0) {
					Alert.alert(
						"Errors",
						errorsArray.join("\n") // Join error messages with newlines
					);
				}
			},
		}
	);

	const userId = user ? user.id : null;
	console.log('useridd',user);
	const id = "f38f6a21-8c21-4fb4-9e39-bdbe63ce0100";

	const {
		loading: loadingInfo,
		error: errorInfo,
		data: dataInfo,
	} = useQuery(auth.GET_USER_INFO_BY_ID, {
		variables: { id: id },
		fetchPolicy: "network-only", // This fetches data from the server, ignoring the cache
	});

	console.log("sssss", dataInfo);

	const [isChecked, setIsChecked] = useState(false);
	const [isCheckedAdditional, setIsCheckedAdditional] = useState(false);

	const toggleCheckbox = () => {
		setIsChecked(!isChecked);
	};

	const onSubmitForm = (data) => {
		let inputData = {
			input: {
				email: data.email,
				firstName: data.firstName,
				primMobile: data.primMobile,
				gender: data.gender,
				dob: data.dob,
				lastName: data.lastName,
			},
		};
		// console.log("data :: ", inputData);
		// updateUser({ variables: inputData });
		openModal();
	};

	return (
		<>
			{/* <StatusBar barStyle="dark-content" /> */}
			<SafeAreaView style={styles.container}>
				<View style={[styles.wrapper, { flex: 0.1 }]}>
					<AuthHeader title={"Fill Your Profile"} />
				</View>

				<View style={{ flex: 0.85 }}>
					<Formik
						initialValues={{
							firstName: user?.firstName ? user?.firstName : "",
							lastName: user?.lastName ? user?.lastName : "",
							email: user?.email ? user?.email : "",
							primMobile: user?.primMobile ? user?.primMobile : "",
							dob: user?.dob ? user?.dob : null,
							gender: user?.gender ? user?.gender : null,
							password: "",
							secMobile: "",
							documentType: null,
							documentNo: "",
							longitude: "123",
							latitude: "345",
							address: "",
							chronicDiseases: ["malayria", "tb"],
							allergies: "polo",
							isPregnant: false,
							profilePicData: null,
						}}
						onSubmit={(values) => onSubmitForm(values)}
						// validationSchema={profileSchema}
					>
						{({
							handleChange,
							handleBlur,
							handleSubmit,
							setFieldValue,
							values,
							errors,
							isValid,
						}) => (
							<ScrollView
								showsVerticalScrollIndicator={false}
								style={{ flex: 1 }}
							>
								<TouchableOpacity
									onPress={pickImage}
									style={{
										padding: 12,
										alignSelf: "center",
										borderRadius: 50,
										borderColor: "#CCCCCC",
										borderWidth: 0.6,
										backgroundColor: "#F5F5F5",
										marginBottom: 12,
									}}
								>
									<FontAwesome5 name="user-edit" size={54} color="#CCCCCC" />
									{/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
								</TouchableOpacity>
								<View style={styles.rowContainer}>
									<View style={[styles.inputContainer, { width: "45%" }]}>
										<Text style={styles.title}>{"First Name"}</Text>
										<TextInput
											name="firstName"
											style={styles.smallInput}
											placeholder={"Enter Name"}
											onChangeText={handleChange("firstName")}
											onBlur={handleBlur("firstName")}
											value={values.firstName}
										/>
										{/* {errors.firstName && (
										<Text style={styles.errorText}>{errors.firstName}</Text>
									)} */}
									</View>
									<View style={{ marginHorizontal: 10 }}></View>
									<View style={[styles.inputContainer, { width: "46%" }]}>
										<Text style={styles.title}>{"Last Name"}</Text>
										<TextInput
											name="lastName"
											style={styles.smallInput}
											placeholder={"Enter Username"}
											onChangeText={handleChange("lastName")}
											onBlur={handleBlur("lastName")}
											value={values.lastName}
										/>
										{/* {errors.lastName && (
										<Text style={styles.errorText}>{errors.lastName}</Text>
									)} */}
									</View>
								</View>
								<View style={styles.inputContainer}>
									<Text style={styles.title}>{"Email Address"}</Text>
									<TextInput
										name="email"
										style={styles.input}
										placeholder={"Enter email"}
										onChangeText={handleChange("email")}
										onBlur={handleBlur("email")}
										value={values.email}
									/>
									{/* {errors.email && (
										<Text style={styles.errorText}>{errors.email}</Text>
									)} */}
								</View>

								<View style={styles.inputContainer}>
									<Text style={styles.title}>{"Password"}</Text>
									<TextInput
										name="password"
										style={styles.input}
										onChangeText={handleChange("password")}
										onBlur={handleBlur("password")}
										secureTextEntry={true}
										value={values.password}
									/>
								</View>

								<View style={styles.inputContainer}>
									<Text style={styles.title}>{"Phone Number"}</Text>
									<TextInput
										name="primMobile"
										style={styles.input}
										placeholder={"Enter Phone Number"}
										onChangeText={handleChange("primMobile")}
										onBlur={handleBlur("primMobile")}
										value={values.primMobile}
										keyboardType="numeric"
									/>
									{/* {errors.primMobile && (
										<Text style={styles.errorText}>{errors.primMobile}</Text>
									)} */}
								</View>
								<View style={styles.rowContainer}>
									<View style={[styles.inputContainer, { width: "45%" }]}>
										<Text style={styles.title}>{"Date of Birth"}</Text>
										<TouchableOpacity
											onPress={openDatePicker}
											style={[styles.smallInput, { paddingVertical: 14 }]}
										>
											<Text style={styles.datePickerButtonText}>
												{selectedDate.toLocaleDateString("en-US")}
											</Text>
										</TouchableOpacity>
										{showDatePicker && (
											<DateTimePicker
												value={selectedDate}
												mode="date"
												display="default"
												onChange={handleDateChange}
											/>
										)}
										{/* {errors.dob && (
										<Text style={styles.errorText}>{errors.dob}</Text>
									)} */}
									</View>
									<View style={{ marginHorizontal: 10 }}></View>
									<View style={[styles.inputContainer, { width: "46%" }]}>
										<Text style={styles.title}>{"Gender"}</Text>
										<View style={{ zIndex: 999 }}>
											<DropDownPicker
												open={open}
												value={values.gender}
												placeholder="Select your gender"
												style={styles.smallInput}
												items={items}
												setOpen={setOpen}
												containerStyle={{ zIndex: 1 }}
												setValue={(callback) => {
													const val = callback();
													setFieldValue("gender", val); // Update the form state
												}}
											/>
										</View>
										{/* {errors.gender && (
										<Text style={styles.errorText}>{errors.gender}</Text>
									)} */}
									</View>
								</View>
								{values.gender === "female" && (
									<View style={styles.inputContainer}>
										<CheckBox
											title={"Is Pregnant?"}
											checked={isChecked}
											onPress={toggleCheckbox}
											containerStyle={{ backgroundColor: "transparent" }}
										/>
									</View>
								)}

								<View style={styles.rowContainer}>
									<View style={[styles.inputContainer, { width: "45%" }]}>
										<Text style={styles.title}>{"Document Type"}</Text>
										<View style={{ zIndex: 1 }}>
											<DropDownPicker
												open={openDocumentType}
												value={values.documentType}
												placeholder="Select Document Type"
												style={styles.smallInput}
												items={documentType}
												setOpen={setOpenDocumentType}
												setValue={(callback) => {
													const val = callback();
													setFieldValue("documentType", val); // Update the form state
												}}
												// setItems={setDocumentType}
											/>
										</View>
									</View>

									<View style={{ marginHorizontal: 10 }}></View>
									<View style={[styles.inputContainer, { width: "46%" }]}>
										<Text style={styles.title}>{"Document Number"}</Text>
										<TextInput
											name="documentNo"
											keyboardType="numeric"
											style={styles.smallInput}
											onChangeText={handleChange("documentNo")}
											onBlur={handleBlur("documentNo")}
											value={values.documentNo}
										/>
									</View>
								</View>

								<View style={styles.inputContainer}>
									<Text style={styles.title}>{"Address"}</Text>
									<TextInput
										name="address"
										style={styles.input}
										onChangeText={handleChange("address")}
										onBlur={handleBlur("address")}
										value={values.address}
									/>
								</View>

								<View style={styles.inputContainer}>
									<CheckBox
										title={"Additional Options"}
										checked={isCheckedAdditional}
										onPress={() => setIsCheckedAdditional(!isCheckedAdditional)}
										containerStyle={{ backgroundColor: "transparent" }}
									/>
								</View>

								{isCheckedAdditional && (
									<>
										{/* Additional input fields */}
										<View style={styles.inputContainer}>
											<Text style={styles.title}>{"Email Address"}</Text>
											<TextInput
												name="email"
												style={styles.input}
												placeholder={"Enter email"}
												onChangeText={handleChange("email")}
												onBlur={handleBlur("email")}
												value={values.email}
											/>
										</View>
										<View style={styles.inputContainer}>
											<Text style={styles.title}>
												{"Secondary Phone Number"}
											</Text>
											<TextInput
												name="secMobile"
												style={styles.input}
												onChangeText={handleChange("secMobile")}
												onBlur={handleBlur("secMobile")}
												value={values.secMobile}
												keyboardType="numeric"
												maxLength={9}
											/>
										</View>

										<View style={styles.inputContainer}>
											<Text style={styles.title}>{"Chronic Diseases"}</Text>
											<TextInput
												name="chronicDiseases"
												style={styles.input}
												onChangeText={handleChange("chronicDiseases")}
												onBlur={handleBlur("chronicDiseases")}
												value={values.chronicDiseases.join(", ")} // Convert array to string for display
											/>
										</View>

										<View style={styles.inputContainer}>
											<Text style={styles.title}>{"Allergies"}</Text>
											<TextInput
												name="allergies"
												style={styles.input}
												onChangeText={handleChange("allergies")}
												onBlur={handleBlur("allergies")}
												value={values.allergies}
											/>
										</View>
									</>
								)}

								<TouchableOpacity style={styles.button} onPress={handleSubmit}>
									<Text style={styles.buttonText}>SAVE</Text>
								</TouchableOpacity>
								<ProfileModal isVisible={modalVisible} onClose={closeModal} />
							</ScrollView>
						)}
					</Formik>
				</View>
			</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
	},
	rowContainer: {
		flexDirection: "row",
	},
	inputContainer: {
		marginBottom: 15,
	},
	errorText: {
		fontSize: 10,
		color: "red",
	},
	title: {
		fontFamily: "Roboto",
		fontSize: 15,
		fontWeight: "600",
		lineHeight: 20,
		letterSpacing: 0,
		textAlign: "left",
		marginBottom: 8,
		color: "#000",
	},
	input: {
		fontFamily: "Roboto",
		fontSize: 15,
		fontWeight: "400",
		lineHeight: 20,
		letterSpacing: 0,
		textAlign: "left",
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 10,
		width: windowWidth - 40,
	},
	smallInput: {
		fontFamily: "Roboto",
		fontSize: 15,
		fontWeight: "400",
		lineHeight: 20,
		letterSpacing: 0,
		textAlign: "left",
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 10,
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
		fontSize: 14,
		fontWeight: "600",
		lineHeight: 21,
		letterSpacing: 0,
		color: "white",
	},
	textStyle: {
		fontSize: 14,
		fontWeight: "500",
		lineHeight: 18,
		letterSpacing: 0,
		textAlign: "center",
		padding: 10,
	},
	wrapper: {
		flexDirection: "row",
		alignItems: "center",
		// flex: 0.15,
	},
	backButton: {
		borderWidth: 0.5,
		borderColor: "#00000024",
		marginLeft: 15,
	},
	signUpText: {
		fontSize: 22,
		fontWeight: "500",
	},
	datePickerButtonText: {
		fontSize: 18,
	},
});

export default ProfileForm;
