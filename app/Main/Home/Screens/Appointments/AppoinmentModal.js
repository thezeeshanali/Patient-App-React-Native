import React, { useState, useEffect } from "react";
import { Modal, Text, View, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AppoinmentModal = ({ isVisible, onClose }) => {
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);
  const navigation = useNavigation();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* <Ionicons name="ios-checkmark-circle-outline" size={64} color="#9869AD" /> */}
          <Image
            style={{ marginTop: 20, alignSelf: "center" }}
            source={require("../Home/assets/tickIcon.png")}
          />
          <Text style={styles.congratsText}>Congratulations!</Text>
          <Text style={styles.messageText}>
            Your appointments is confirmed.
          </Text>
          {/* <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:10,borderBottomWidth:0.5,borderBottomColor:'#00000030'}}>
            <Text style={{fontSize:18}}>Booking ID</Text>
            <Text  style={{fontSize:18,fontWeight:'700'}}>#A330546549</Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:10,borderBottomWidth:0.5,borderBottomColor:'#00000030'}}>
            <Text style={{fontSize:18}}>Date</Text>
            <Text  style={{fontSize:18,fontWeight:'700'}}>18 Feb, 2023 Saturday</Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:10}}>
            <Text style={{fontSize:18}}>Time</Text>
            <Text  style={{fontSize:18,fontWeight:'700'}}>01:00 PM</Text>
          </View> */}
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 10,
              justifyContent: "space-between",
              marginHorizontal: 20,
            }}
          >
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("HomeScreen");
              }}
            >
              {/* <Text style={styles.buttonText}>Pay Advance</Text> */}
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
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
    // alignItems: 'center',
    margin: 10,
    // height:300,
  },
  congratsText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  messageText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#4BBDE5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    // marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    // marginRight: 10,
    borderWidth: 0.8,
    borderColor: "#00000060",
  },
  cancelButtonText: {
    color: "#000",
    fontSize: 16,
    // fontWeight: 'bold',
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
};

export default AppoinmentModal;
