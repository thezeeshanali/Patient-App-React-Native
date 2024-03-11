import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Image, Dimensions } from 'react-native';
import AppointmentHeader from './AppointmentHeader';
import { TouchableOpacity } from 'react-native';
import AddPaymentCardModal from './AddPaymentCardModal';
const windowWidth = Dimensions.get("window").width;

function CardSummery ({navigation}) {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
      setIsModalVisible(!isModalVisible);
      console.log('oooooooo')
    };


  const handleEditCard = () => {
    // Logic to edit the card
  };

  const handleConfirm = () => {
    // Logic to confirm the payment
    navigation.navigate('AddAddress');
  };

  return (
    <>
    <View style={styles.container}>
        <View style={[styles.wrapper, { flex: 0.2 }]}>
          <AppointmentHeader title={'Summery'}/>
        </View>

        <View style={{flex:0.6}}>
      <TouchableOpacity onPress={toggleModal} style={{borderWidth:0.5,paddingVertical:40,borderColor:'#00000040',borderRadius:10,marginHorizontal:30,alignItems:'center'}}>
        <Text style={{fontSize:20}}>Add New Card +</Text>
      </TouchableOpacity>
      <AddPaymentCardModal isVisible={isModalVisible} onClose={toggleModal} />

      <View style={styles.row}>
        <Text style={{fontSize:18}}>Medicine Bill:</Text>
        <Text style={{fontSize:18}}>$50.00</Text>
      </View>

      <View style={[styles.row,{borderBottomWidth:0.5,borderBottomColor:'#00000030'}]}>
        <Text style={{fontSize:18}}>Discount:</Text>
        <TextInput keyboardType={'Numeric'} style={{borderWidth:0.5,borderColor:'#00000040',flex:0.2,borderRadius:5}}/>
      </View>

      <View style={[styles.row,{borderBottomWidth:0.5,borderBottomColor:'#00000030'}]}>
        <Text style={{fontSize:18}}>Total: </Text>
        <Text style={{fontSize:18}}>$40.00</Text>
      </View>

      <View style={{flexDirection:'row',alignItems: 'center',padding: 10,margin:30,borderWidth:0.5,borderColor:'#00000040',borderRadius:10,paddingVertical:16}}>
        <Image style={{marginRight:20}} source={require('../Home/assets/cardIcon.png')}/>
        <Text style={{fontSize:18,color:'#666666'}}>•••• •••• •••• 1234</Text>
      </View>

      <TouchableOpacity onPress={handleEditCard} style={{flexDirection:'row',justifyContent:'flex-end',marginRight:30,alignItems:'center'}}>
        <Image style={{marginRight:5}} source={require('../Home/assets/editIcon.png')}/>
        <Text style={{color:'#9869AD',fontWeight:'500'}}>Edit Card</Text>
      </TouchableOpacity>
      </View>

      <View style={{alignItems:'center', flex: 0.2, justifyContent: 'flex-end',}}>
      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>

    </View>

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor:'#fff',
    },
    wrapper: {
        flexDirection: "row",
        alignItems: "center",
    },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    marginHorizontal:30
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
    textTransform:'uppercase'
  },    
});

export default CardSummery;
