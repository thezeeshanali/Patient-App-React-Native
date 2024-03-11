import { Entypo } from "@expo/vector-icons";
import { Formik } from "formik";
import React from "react";
import { Dimensions, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View,KeyboardAvoidingView
} from "react-native";
import * as yup from "yup";
import AuthHeader from "./AuthHeader";
const windowWidth = Dimensions.get("window").width;

function ForgotPasswordScreen({props,navigation}) {

  const validationSchema = yup.object().shape({
    email: yup.string().required("Email Address is Required"),
  });

  const onSubmitForm = (data) => {
    console.log('Forgot Password')
  };

  return (
    <>
      {/* <StatusBar barStyle="dark-content" /> */}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={[styles.wrapper, { flex: 0.35 }]}>
          <AuthHeader title={'Forgot Password'}/>
        </View>
        <View>
        <Formik
            initialValues={{ email: ""}}
            onSubmit={(values) => onSubmitForm(values)}
            validationSchema={validationSchema}
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
                  <Text style={styles.title}>{"Email Address"}</Text>
                  <TextInput
                    name="email"
                    style={styles.input}
                    placeholder={"Enter Email"}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyboardType="email-address"
                  />
                  {errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>SUBMIT</Text>
                </TouchableOpacity>

              </>
            )}
          </Formik>
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
    color:'#000'
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
    marginVertical:10
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
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 16,
    // position:'absolute',
    // left:10,
    // top:50,
  },
  backButton: {
    marginRight: 26,borderWidth:0.5,borderColor:'#00000024'
  },
  signUpText: {
    fontSize: 22,
    fontWeight: '500',
    marginLeft:70,
  },

});
export default ForgotPasswordScreen;
