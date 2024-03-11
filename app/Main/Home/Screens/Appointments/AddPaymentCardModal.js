import React, { useState, useEffect } from 'react';
import { Modal, Text, View, TouchableOpacity,Image,TextInput,Button,Dimensions, ScrollView } from 'react-native';
import { MaterialCommunityIcons ,Entypo } from '@expo/vector-icons';
import { CheckBox, Input } from 'react-native-elements';
const windowWidth = Dimensions.get("window").width;

const AddPaymentCardModal = ({ isVisible, onClose }) => {
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);

  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');

  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handleSave = () => {
    // Handle saving credit card details
    onClose();
  };


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <View style={{borderWidth: 0.5,borderColor: "#00000024",padding:5}}>
            <Entypo name="chevron-small-left" size={26} color="black" onPress={onClose} />
            </View>
            <Text style={styles.modalTitle}>Add Your Card</Text>
            <View style={{borderWidth: 0.5,borderColor: "#00000024",padding:5}}>
            <MaterialCommunityIcons name="credit-card-scan-outline" size={26} color="black" /> 
            </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop:10}}>
          <View style={{alignItems:'center'}}>
            <Image source={require('../Home/assets/Card.png')}/>
          </View>
          <Text style={{fontSize:18,marginTop:20}}>Card Number</Text>
          <View style={{borderWidth: 0.5,borderColor: "#00000024",borderRadius: 5,flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10}}>
          <TextInput
            style={[styles.input,{flex:0.8}]}
            placeholder="Number"
            value={cardNumber}
            keyboardType='Numeric'
            onChangeText={(text) => setCardNumber(text)}
          />
          <Image style={{marginRight:20}} source={require('../Home/assets/cardIcon.png')}/>
          </View>
          <Text style={{fontSize:18,marginTop:20}}>Card holder name</Text>
          <View style={{borderWidth: 0.5,borderColor: "#00000024",borderRadius: 5,flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10}}>
          <TextInput
            style={[styles.input,{flex:0.8}]}
            placeholder="Name of card"
            value={cardName}
            onChangeText={(text) => setCardName(text)}
          />
          <Image style={{marginRight:20}} source={require('../Home/assets/cardIcon.png')}/>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View style={{flex:0.46}}>
              <Text style={{fontSize:18,marginTop:20}}>3-Digit CVV</Text>
              <View style={{borderWidth: 0.5,borderColor: "#00000024",borderRadius: 5,marginTop:10}}>
                <TextInput
                    style={styles.input}
                    placeholder="Name of card"
                    value={cvv}
                    onChangeText={(text) => setCvv(text)}
                />
                </View>
            </View>
            <View style={{flex:0.46}}>
              <Text style={{fontSize:18,marginTop:20}}>Expires on</Text>
              <View style={{borderWidth: 0.5,borderColor: "#00000024",borderRadius: 5,marginTop:10}}>
                <TextInput
                    style={styles.input}
                    placeholder="MM/YY"
                    value={expirationDate}
                    onChangeText={(text) => setExpirationDate(text)}
                />
                </View>
            </View>
          </View>
          <View style={{marginTop:20}}>
          <CheckBox
            title="Save card for Future"
            checked={isChecked}
            onPress={toggleCheckbox}
            containerStyle={styles.checkboxContainer}
            textStyle={{fontSize:16,fontWeight:'300',color:'#000'}}
           />
            </View>

          <View style={{alignItems:'center',marginTop:20,marginBottom:20}}>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>

        </View>
        </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flex: 0.8,
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    top:90
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    // marginBottom: 20,
  },
  input: {
    padding: 2,
    marginVertical: 5,
    marginLeft:10,
  },
  button: {
    width: windowWidth - 40,
    height: 45,
    backgroundColor: "#4BBDE5",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 21,
    letterSpacing: 0,
    color: "white",
    textTransform:'uppercase'
  },    
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
};

export default AddPaymentCardModal;
