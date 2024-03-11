import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import CountDown from "react-native-countdown-component";
import { useGlobalContext } from "../../Context/ContextProvider";
import { Ionicons, Entypo } from "@expo/vector-icons";
import AuthHeader from "./AuthHeader";
import auth from "../../gql/auth";
import { useMutation } from "@apollo/client";
import { Alert } from "react-native";

const VerifyAccount = ({ navigation }) => {
  const { user, setUser, setAppLoader } = useGlobalContext();
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const [timeRemaining, setTimeRemaining] = useState(59);
  const inputRefs = [];

  const [confirmOtp, { data, loading, error }] = useMutation(
    auth.CONFIRM_OTP,
    {
      update(proxy, result) {
        onSuccessfulRequestResponse(result.data);
      },
      onError(error) {
        onResponseError(error);
      },
    }
  );

  const onSuccessfulRequestResponse = (data) => {
    setAppLoader(false);
    navigation.navigate("LoginScreen");
    console.log("data :: ", data);
  };

  const onResponseError = (error) => {
    setAppLoader(false);
    const errorsArray = Array.isArray(error) ? error : [error];

    if (errorsArray.length > 0) {
      Alert.alert(
        "Errors",
        errorsArray.join("\n") // Join error messages with newlines
      );
    }

    console.log("error :: ", error);
  };



  useEffect(() => {
    let interval;

    if (timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timeRemaining]);

  const handleResendCode = () => {
    // Code to handle resending the verification code
    setTimeRemaining(59);
  };

  const handleVerify = () => {
    // Code to handle verifying the verification code
    const code = verificationCode.join("");
    // confirmOtp({ input: code }); // Fix this line to use the entered code
    console.log("Verification code:", verificationCode);

    // Navigate to the login screen when the code is entered
    if (code.length === 4) {
      navigation.navigate("LoginScreen");
    }
  };

  const focusNextField = (index) => {
    if (inputRefs[index + 1]) {
      inputRefs[index + 1].focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={[styles.wrapper, { flex: 1 / 5 }]}>
        <AuthHeader title={'Verify Your Account'}/>
      </View>
      <View style={{ flex: 1, alignItems: "center",marginTop:20 }}>
        <Text style={{ fontSize: 16 }}>
          Please enter the 4-digit code sent to{" "}
        </Text>
        <TouchableOpacity style={{ marginTop: 4 }}>
          <Text style={{ color: "#9869AD", fontSize: 16 }}>
            +966 55 555 5555
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          {verificationCode.map((code, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs[index] = ref)}
              style={styles.input}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(text) => {
                setVerificationCode((prevCode) => {
                  const newCode = [...prevCode];
                  newCode[index] = text;

                  if (text !== "") {
                    focusNextField(index);
                  }

                  return newCode;
                });
              }}
              value={code}
              onSubmitEditing={() => focusNextField(index)}
            />
          ))}
        </View>
        <View style={{ marginTop: 30 }}>
          {timeRemaining > 0 ? (
            <Text style={{ fontSize: 16 }}>
              Resend code in {timeRemaining} sec
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResendCode}>
              <Text style={{ fontWeight: "600", fontSize: 16 }}>
                Resend code
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={handleVerify} style={styles.verifyButton}>
          <Text style={{ color: "white" }}>VERIFY</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "black",
    fontSize: 24,
    textAlign: "center",
    marginHorizontal: 5,
  },
  verifyButton: {
    backgroundColor: "#4BBDE5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    // padding: 16,
    // position: "absolute",
    // left: 10,
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
    marginLeft: 100,
  },
};

export default VerifyAccount;
