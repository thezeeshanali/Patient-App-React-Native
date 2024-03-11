import React from "react";
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
	KeyboardAvoidingView,
	Image,
	FlatList,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Formik, setFieldValue } from "formik";
import * as yup from "yup";
import * as SecureStore from "expo-secure-store";
import authApi from "../../api/auth";
import { useGlobalContext } from "../../Context/ContextProvider";
import { Ionicons, Entypo, FontAwesome5 } from "@expo/vector-icons";
import AuthHeader from "./AuthHeader";
import auth from "../../gql/auth";
import { useMutation } from "@apollo/client";
import logo from "../../../assets/logo.png";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { CheckBox } from "react-native-elements";
import { useEffect } from "react";
import MapView, { Marker } from "react-native-maps";

const windowWidth = Dimensions.get("window").width;

function RegisterScreen({ props, navigation }) {
	const { user, setUser, setAppLoader, appLoader, setUserId } =
		useGlobalContext();

	const onSuccessfulRequestResponse = (data) => {
		setAppLoader(false);
		navigation.navigate("VerifyAccount");
	};

	const onResponseError = (error) => {
		setAppLoader(false);
		console.log(error);
		const errorsArray = Array.isArray(error) ? error : [error];

		if (errorsArray.length > 0) {
			Alert.alert(
				"Errors",
				errorsArray.join("\n") // Join error messages with newlines
			);
		}
	};

	//   const [registerUser, { data, loading, error }] = useMutation(
	//     auth.USER_REGISTER_MUTATION,
	//     {
	//       update(proxy, result) {
	//         onSuccessfulRequestResponse(result.data);
	//       },
	//       onError(error) {
	//         onResponseError(error);
	//       },
	//     }
	//   );
	const [registerUser, { data, loading, error }] = useMutation(
		auth.USER_REGISTER_MUTATION,
		{
			onCompleted: (data) => {
				// Handle successful response
				onSuccessfulRequestResponse(data);
				// setUserId(data?.signup?.data?.id);
			},
			onError: (error) => {
				// Handle error response
				console.error("Mutation error:", error);
				onResponseError(error);
			},
		}
	);
	const onSubmitForm = (data) => {
		// console.log("data :: ", data);
		let inputData = {
			input: {
				email: data.email,
				password: data.password,
				firstName: data.firstName,
				primMobile: data.primMobile,
				documentType: data.documentType,
				documentNo: data.documentNo,
				gender: data.gender,
				dob: data.dob,
				profilePicData: data.profilePicData,
				secMobile: data.secMobile,
				lastName: data.lastName,
				longitude: data.longitude,
				latitude: data.latitude,
				address: data.address,
				chronicDiseases: data.chronicDiseases,
				allergies: data.allergies,
			},
		};
		console.log("inputData :: ", inputData);
		setAppLoader(true);
		registerUser({ variables: inputData });
	};

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setAppLoader(false);
		}, 3000);

		return () => clearTimeout(timeoutId);
	}, [appLoader]);

	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [gender, setGender] = useState([
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

	const handleDateChange = (event, date) => {
		if (date !== undefined) {
			setSelectedDate(date);
		}
		setShowDatePicker(false);
	};

	const openDatePicker = () => {
		setShowDatePicker(true);
	};

	const [region, setRegion] = useState({
		latitude: 37.78825,
		longitude: -122.4324,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	});

	const handleRegionChange = (newRegion) => {
		setRegion(newRegion);
	};

	const [image, setImage] = useState(null);

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
			const imageUri = result.assets[0].uri;

			// Convert image to base64
			const base64 = await imageToBase64(imageUri);
			const base64WithPrefix = `data:image/png;base64,${base64}`;

			// Now you have the base64 data in the 'base64' variable
			console.log("Base64 Data: ", base64WithPrefix);

			// You can set the base64 data or use it as needed
			// setImage(base64);
		}
	};

	const imageToBase64 = async (uri) => {
		const base64 = await FileSystem.readAsStringAsync(uri, {
			encoding: FileSystem.EncodingType.Base64,
		});
		return base64;
	};

	const [isChecked, setIsChecked] = useState(false);
	const [isCheckedAdditional, setIsCheckedAdditional] = useState(false);

	const toggleCheckbox = () => {
		setIsChecked(!isChecked);
	};

	const registerSchema = yup.object().shape({
		primMobile: yup
			.string()
			.required("Phone Number is required")
			.matches(/^05[0-9]{0,9}$/, {
				message: "Invalid mobile number format. It should start with 05.",
				excludeEmptyString: true,
			}),

		password: yup
			.string()
			.min(6, "Password must be at least 6 characters")
			.required("Password is required"),

		firstName: yup.string().required("First Name is required"),
		lastName: yup.string().required("Last Name is required"),
		documentType: yup.string().required("Document Type is required"),
		documentNo: yup.string().required("Document Number is required"),
		dob: yup.string().required("Date of Birth is required"),
		gender: yup.string().required("Gender is required"),
		address: yup.string().required("Address is required"),
		// Optional fields
		email: yup.string().email("Invalid email"),
		longitude: yup.string(),
		latitude: yup.string(),
		chronicDiseases: yup.array(),
		allergies: yup.string(),
		isPregnant: yup.boolean(),
		// profilePicData: yup.string(),
	});

	return (
		<>
			{/* <StatusBar barStyle="dark-content" /> */}
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<View style={[styles.wrapper, { marginBottom: 10, marginTop: 40 }]}>
					<AuthHeader title={"Sign Up "} />
				</View>
				<View style={{ flex: 1, marginTop: 20, marginLeft: 5 }}>
					<Formik
						initialValues={{
							password: "",
							primMobile: "",
							email: "",
							firstName: "",
							lastName: "",
							secMobile: "",
							documentType: null,
							documentNo: "",
							gender: null,
							dob: "23-march-1990",
							longitude: "123",
							latitude: "345",
							address: "",
							chronicDiseases: ["malayria", "tb"],
							allergies: "polo",
							isPregnant: false,
							profilePicData: null,
						}}
						onSubmit={(values) => {
							onSubmitForm(values);
						}}
						validationSchema={registerSchema}
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
							<>
								<ScrollView
									contentContainerStyle={{ flexGrow: 1 }}
									showsVerticalScrollIndicator={false}
									keyboardShouldPersistTaps="never"
									style={{ flex: 1 }}
								>
									{/* {errors && Object.keys(errors).length > 0 && (
										<View>
											<Text>Validation Errors:</Text>
											<ScrollView>
												{Object.values(errors).map((error, index) => (
													<>
														<Text key={index}>{error}</Text>
														{console.log(error)}
													</>
												))}
											</ScrollView>
										</View>
									)} */}

									<View style={styles.rowContainer}>
										<View style={[styles.inputContainer, { width: "45%" }]}>
											<Text style={styles.title}>{"First Name"}</Text>
											<TextInput
												name="firstName"
												style={styles.smallInput}
												placeholder={"First Name"}
												onChangeText={handleChange("firstName")}
												onBlur={handleBlur("firstName")}
												value={values.firstName}
											/>
											{errors.firstName && (
												<Text style={styles.errorText}>{errors.firstName}</Text>
											)}
										</View>
										<View style={{ marginHorizontal: 10 }}></View>
										<View style={[styles.inputContainer, { width: "46%" }]}>
											<Text style={styles.title}>{"Last Name"}</Text>
											<TextInput
												name="lastName"
												style={styles.smallInput}
												placeholder={"Last Name"}
												onChangeText={handleChange("lastName")}
												onBlur={handleBlur("lastName")}
												value={values.lastName}
											/>
											{errors.lastName && (
												<Text style={styles.errorText}>{errors.lastName}</Text>
											)}
										</View>
									</View>

									<View style={styles.inputContainer}>
										<Text style={styles.title}>{"Primary Phone Number"}</Text>
										<TextInput
											name="primMobile"
											style={styles.input}
											placeholder={"05********"}
											onChangeText={handleChange("primMobile")}
											onBlur={handleBlur("primMobile")}
											value={values.primMobile}
											keyboardType="numeric"
											maxLength={10}
										/>
										{errors.primMobile && (
											<Text style={styles.errorText}>{errors.primMobile}</Text>
										)}
									</View>
									<View style={styles.inputContainer}>
										<Text style={styles.title}>{"Password"}</Text>
										<TextInput
											name="password"
											style={styles.input}
											placeholder={"*******"}
											onChangeText={handleChange("password")}
											onBlur={handleBlur("password")}
											secureTextEntry={true}
											value={values.password}
										/>
										{errors.password && (
											<Text style={styles.errorText}>{errors.password}</Text>
										)}
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
											{errors.dob && (
												<Text style={styles.errorText}>{errors.dob}</Text>
											)}
										</View>
										<View style={{ marginHorizontal: 10 }}></View>
										<View style={[styles.inputContainer, { width: "46%" }]}>
											<Text style={styles.title}>{"Gender"}</Text>
											<View style={{ zIndex: 999 }}>
												<DropDownPicker
													open={open}
													value={values.gender}
													placeholder="Select gender"
													style={styles.smallInput}
													items={gender}
													containerStyle={{ zIndex: 1 }}
													setOpen={setOpen}
													setValue={(callback) => {
														const val = callback();
														setFieldValue("gender", val); // Update the form state
													}}
													// setItems={setGender}
												/>
											</View>
											{errors.gender && (
												<Text style={styles.errorText}>{errors.gender}</Text>
											)}
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
											{errors.documentType && (
												<Text style={styles.errorText}>
													{errors.documentType}
												</Text>
											)}
										</View>

										<View style={{ marginHorizontal: 10 }}></View>
										<View style={[styles.inputContainer, { width: "46%" }]}>
											<Text style={styles.title}>{"Document Number"}</Text>
											<TextInput
												name="documentNo"
												keyboardType="numeric"
												style={styles.smallInput}
												placeholder={"Document Number"}
												onChangeText={handleChange("documentNo")}
												onBlur={handleBlur("documentNo")}
												value={values.documentNo}
											/>
											{errors.documentNo && (
												<Text style={styles.errorText}>
													{errors.documentNo}
												</Text>
											)}
										</View>
									</View>

									<View style={styles.inputContainer}>
										<Text style={styles.title}>{"Address"}</Text>
										<TextInput
											name="address"
											style={styles.input}
											placeholder={"Enter Address"}
											onChangeText={handleChange("address")}
											onBlur={handleBlur("address")}
											value={values.address}
										/>
										{errors.address && (
											<Text style={styles.errorText}>{errors.address}</Text>
										)}
									</View>
									{/* <MapView
										style={styles.map}
										region={region}
										onRegionChangeComplete={handleRegionChange}
									>
										<Marker
											coordinate={{
												latitude: region.latitude,
												longitude: region.longitude,
											}}
										/>
									</MapView> */}

									{/* Checkbox for additional options */}
									<View style={styles.inputContainer}>
										<CheckBox
											title={"Additional Options"}
											checked={isCheckedAdditional}
											onPress={() =>
												setIsCheckedAdditional(!isCheckedAdditional)
											}
											containerStyle={{ backgroundColor: "transparent" }}
										/>
									</View>

									{/* Additional fields conditionally rendered based on checkbox state */}
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
													placeholder={"Enter Mobile"}
													onChangeText={handleChange("secMobile")}
													onBlur={handleBlur("secMobile")}
													value={values.secMobile}
													keyboardType="numeric"
													maxLength={9}
												/>
												{errors.secMobile && (
													<Text style={styles.errorText}>
														{errors.secMobile}
													</Text>
												)}
											</View>

											<View style={styles.inputContainer}>
												<Text style={styles.title}>{"Chronic Diseases"}</Text>
												<TextInput
													name="chronicDiseases"
													style={styles.input}
													placeholder={"Enter Chronic Diseases"}
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
													placeholder={"Enter Allergies"}
													onChangeText={handleChange("allergies")}
													onBlur={handleBlur("allergies")}
													value={values.allergies}
												/>
											</View>

											<View style={styles.inputContainer}>
												<TouchableOpacity
													onPress={pickImage}
													style={styles.input}
												>
													<Text style={[styles.title, { marginBottom: 0 }]}>
														Upload Profile Image
													</Text>
												</TouchableOpacity>
											</View>
										</>
									)}
									<View style={{}}>
										<TouchableOpacity
											style={styles.button}
											onPress={() => handleSubmit()}
										>
											<Text style={styles.buttonText}>SIGN UP</Text>
										</TouchableOpacity>
									</View>
								</ScrollView>
							</>
						)}
					</Formik>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "flex-end",
						flex: 1 / 18,
						// marginBottom: 18,
					}}
				>
					<Text style={styles.textStyle}>{"Already have an account?"}</Text>
					<TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
						<Text style={[styles.textStyle, { color: "#9869AD" }]}>
							{"LOGIN"}
						</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
	},
	rowContainer: {
		flexDirection: "row",
		// alignItems: "center",
		// justifyContent: "space-between",
	},
	inputContainer: {
		marginBottom: 14,
	},
	errorText: {
		fontSize: 11,
		color: "red",
		marginTop: 5,
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
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		fontSize: 14,
		fontWeight: "600",
		lineHeight: 21,
		letterSpacing: 0,
		color: "white",
	},
	map: {
		height: 200,
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
		// justifyContent: "flex-start",
		alignItems: "center",
	},
	backButton: {
		borderWidth: 0.5,
		borderColor: "#00000024",
	},
	signUpText: {
		fontSize: 22,
		fontWeight: "500",
	},
});

export default RegisterScreen;
