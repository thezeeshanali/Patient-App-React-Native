import React, { useState } from "react";
import {
	Alert,
	Button,
	Dimensions,
	KeyboardAvoidingView,
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Text,
	StatusBar,
	TextInput,
	TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import * as SecureStore from "expo-secure-store";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { useQuery, gql, useMutation } from "@apollo/client";
import authApi from "../../api/auth";
import { useGlobalContext } from "../../Context/ContextProvider";
import auth from "../../gql/auth";
import { USER_LOGIN_MUTATION } from "../../gql/auth";
import AuthHeader from "./AuthHeader";
import logo from "../../../assets/logo.png";
import { Image } from "react-native";
import { useEffect } from "react";

const windowWidth = Dimensions.get("window").width;

function LoginScreen({ props, navigation }) {
	const { user, setUser, setAppLoader, appLoader } = useGlobalContext();

	async function storeUserSession(json) {
		try {
			await SecureStore.setItemAsync(
				"user_session",
				JSON.stringify({
					// name: json.firstName + " " + json.lastName,
					firstName: json.firstName,
					lastName: json.lastName,
					token: json.bearerToken,
					primMobile: json.primMobile,
					email: json.email,
				})
			);

			// Congrats! You've just stored your first value!
		} catch (error) {
			console.log("error in ecrypted storage : ", error);
		}
	}

	const loginValidationSchema = yup.object().shape({
		primMobile: yup
			.string()
			.required("Phone Number is required")
			.matches(/^05[0-9]{0,9}$/, {
				message: "Invalid mobile number format. It should start with 05.",
				excludeEmptyString: true,
			}),

		password: yup.string().required("Password is required"),
	});

	// const [loginUser, { data, loading, error }] = useMutation(
	//   auth.USER_LOGIN_MUTATION,
	//   {
	//     update(proxy, result) {
	//       onSuccessfulRequestResponse(result);
	//     },
	//     //   onCompleted({ data, errors }) {
	//     //     console.log("data OnCOmpleted :: ", data);
	//     //     console.log("errors OnCOmpleted :: ", errors);

	//     //     if (errors) {
	//     //       onResponseError(errors);
	//     //     }
	//     //     onSuccessfulRequestResponse(data);
	//     //     // Continue processing the response if needed
	//     //   },
	//     onError(error) {
	//       console.log("Error", error);
	//       onResponseError(error);
	//     },
	//   }
	// );

	// const [loginUser] = useMutation(auth.USER_LOGIN_MUTATION, {
	// 	onCompleted: (data) => {
	// 		// Handle successful response
	// 		onSuccessfulRequestResponse(data);
	// 	},
	// 	onError: (error) => {
	// 		// Handle error response
	// 		console.error("Mutation error:", error);
	// 		onResponseError(error);
	// 	},
	// });

	const onSuccessfulRequestResponse = (result) => {
		console.log("result :: ", result);

		if (result?.errors?.length > 0) {
			Alert.alert("Invalid Input", result?.errors?.[0].message);
		} else {
			//store in async storage
			storeUserSession(result?.login?.data);
			setUser({
				token: result?.login?.data?.bearerToken,
				primMobile: result?.login?.data?.primMobile,
				email: result?.login?.data?.email,
				firstName: result?.login?.data?.firstName,
				lastName: result?.login?.data?.lastName,
			});
		}

		setAppLoader(false);
	};

	// const onResponseError = (error) => {
	// 	setAppLoader(false);
	// 	const errorsArray = Array.isArray(error) ? error : [error];

	// 	if (errorsArray.length > 0) {
	// 		Alert.alert(
	// 			"Invalid Input",
	// 			errorsArray.join("\n") // Join error messages with newlines
	// 		);
	// 		console.log("Errors", errorsArray);
	// 	}
	// };

	const [loginUser] = useMutation(auth.USER_LOGIN_MUTATION);

	// const onSubmitForm = async (values) => {
	// 	try {
	// let inputData = {
	// 	primMobile: values.primMobile,
	// 	password: values.password,
	// };
	// 		console.log(inputData);
	// 		const { data, errors } = await loginUser({
	// 			variables: { input: inputData },
	// 		});

	// 		if (errors && errors.length > 0) {
	// 			const errorMessage =
	// 				errors[0].message || "An unexpected error occurred.";

	// 			Alert.alert(
	// 				"Login Failed",
	// 				errorMessage,
	// 				[{ text: "OK", onPress: () => console.log("OK Pressed") }],
	// 				{ cancelable: false }
	// 			);
	// 		} else if (data && data.login) {
	// 			onSuccessfulRequestResponse(data);
	// 		}
	// 	} catch (error) {
	// 		console.log("Login Error:", error);

	// 		Alert.alert(
	// 			"Login Failed",
	// 			"An unexpected error occurred. Please try again.",
	// 			[{ text: "OK", onPress: () => console.log("OK Pressed") }],
	// 			{ cancelable: false }
	// 		);
	// 	}
	// };

	const onSubmitForm = async (values) => {
		try {
			setAppLoader(true); // Set appLoader to true when the login process starts

			let inputData = {
				primMobile: values.primMobile,
				password: values.password,
			};
			console.log(inputData);
			const { data, error } = await loginUser({
				variables: { input: inputData },
			});

			if (error && error.length > 0) {
				const errorMessage =
					error[0].message || "An unexpected error occurred.";

				Alert.alert(
					"Login Failed",
					errorMessage,
					[{ text: "OK", onPress: () => console.log("OK Pressed") }],
					{ cancelable: false }
				);
			} else if (data && data.login) {
				onSuccessfulRequestResponse(data);
			}
		} catch (error) {
			if (error.networkError) {
				getNetworkErrors(error).then((errorMessage) => {
					Alert.alert(
						"Login Failed",
						errorMessage || "An unexpected network error occurred.",
						[{ text: "OK", onPress: () => console.log("OK Pressed") }],
						{ cancelable: false }
					);
				});
			} else {
				console.log("Login Error:", error);
				Alert.alert(
					"Login Failed",
					"An unexpected error occurred. Please try again.",
					[{ text: "OK", onPress: () => console.log("OK Pressed") }],
					{ cancelable: false }
				);
			}
		}
	};

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setAppLoader(false);
		}, 3000);

		return () => clearTimeout(timeoutId);
	}, [appLoader]);

	//test
	// const [text, setText] = useState("");

	// return (
	//   <View style={{ flex: 1 }}>
	//     <ScrollView
	//       contentContainerStyle={{ flexGrow: 1 }}
	//       keyboardShouldPersistTaps="handled" // Ensures ScrollView receives tap events when keyboard is open
	//     >
	//       {/* Other content */}
	//       <TextInput
	//         style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
	//         onChangeText={(value) => setText(value)}
	//         value={text}
	//         placeholder="Type something..."
	//         keyboardType="default" // Use the appropriate keyboard type for your input
	//       />
	//       {/* More content */}
	//       <View
	//         style={{
	//           flexDirection: "row",
	//           justifyContent: "center",
	//           position: "absolute",
	//           bottom: 20,
	//           flex: 1 / 3,
	//         }}
	//       >
	//         <Text style={styles.textStyle}>{"Don't have an account?"}</Text>
	//         <TouchableOpacity
	//           onPress={() => navigation.navigate("RegisterScreen")}
	//         >
	//           <Text style={[styles.textStyle, { color: "#9869AD" }]}>
	//             {"SIGN UP"}
	//           </Text>
	//         </TouchableOpacity>
	//       </View>
	//     </ScrollView>
	//   </View>
	// );
	//end test
	return (
		<>
			{/* <StatusBar barStyle="dark-content" /> */}
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<View style={[styles.wrapper, { flex: 0.9 }]}>
					{/* <AuthHeader title={"Login"} showBackButton={false} /> */}
					<Image style={{ resizeMode: "contain" }} source={logo} />
				</View>

				<View style={[{ flex: 1 }]}>
					<Formik
						initialValues={{ primMobile: "", password: "" }}
						onSubmit={(values, { setSubmitting }) => {
							onSubmitForm(values);
							// setSubmitting(false); // You might need to setSubmitting to false manually
						}}
						validate={(values) => {
							const errors = {};
						}}
						validationSchema={loginValidationSchema}
					>
						{({
							handleChange,
							handleBlur,
							handleSubmit,
							values,
							errors,
							isValid,
						}) => (
							<>
								<View style={styles.inputContainer}>
									<Text style={styles.title}>{"Phone Number"}</Text>
									<TextInput
										name="primMobile"
										style={styles.input}
										placeholder={"Enter Phone Number"}
										onChangeText={handleChange("primMobile")}
										onBlur={handleBlur("primMobile")}
										value={values.primMobile}
										keyboardType="number-pad"
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
										value={values.password}
										secureTextEntry
									/>
									{errors.password && (
										<Text style={styles.errorText}>{errors.password}</Text>
									)}
								</View>
								{/* <TouchableOpacity style={styles.button} onPress={handleSubmit}> */}
								<TouchableOpacity
									style={styles.button}
									// onPress={() => navigation.navigate("VerifyAccount")}
									onPress={handleSubmit}
								>
									<Text style={styles.buttonText}>LOGIN</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => navigation.navigate("ForgotPasswordScreen")}
								>
									<Text style={[styles.textStyle, { color: "#9869AD" }]}>
										{"Forgot Password"}
									</Text>
								</TouchableOpacity>
								{/* <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate("HomeScreen")}
                  // onPress={handleSubmit}
                >
                  <Text style={styles.buttonText}>Home</Text>
                </TouchableOpacity> */}
							</>
						)}
					</Formik>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "flex-end",
						// marginBottom: 15,
						flex: 1 / 4,
					}}
				>
					<Text style={styles.textStyle}>{"Don't have an account?"}</Text>
					<TouchableOpacity
						onPress={() => navigation.navigate("RegisterScreen")}
					>
						<Text style={[styles.textStyle, { color: "#9869AD" }]}>
							{"SIGN UP"}
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
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
	},
	inputContainer: {
		marginBottom: 15,
	},
	errorText: {
		fontSize: 10,
		color: "red",
		marginTop: 8,
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
		// padding: 16,
		// position: "absolute",
		// left: 25,
		// top: 50,
	},
	backButton: {
		marginRight: 26,
		borderWidth: 0.5,
		borderColor: "#00000024",
	},
	signUpText: {
		fontSize: 22,
		fontWeight: "500",
		// marginLeft: 100,
	},
});

export default LoginScreen;
