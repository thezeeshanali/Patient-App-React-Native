import { View, Text,StyleSheet, TextInput, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import React, { useState } from 'react'
import AppointmentHeader from './AppointmentHeader';
import { CheckBox } from 'react-native-elements';
const windowWidth = Dimensions.get("window").width;

export default function AddressList({navigation}) {

  const [selectedAddress, setSelectedAddress] = useState(null);

    // Sample address data (you can replace this with your data)
    const addresses = [
      {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        address: '123 Main St, City, State',
      },
    ];
    
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            // alignItems: 'center',
            marginHorizontal:30,
            padding: 16,
            backgroundColor: '#ffffff',
            borderWidth:0.5,
            borderColor:'#00000040',
            borderRadius:10,
          }}
          onPress={() => setSelectedAddress(item)}
        >
        <View style={{ marginRight: 10 }}>
            <View
              style={{
                width: 16,
                height: 16,
                borderRadius: 12,
                borderWidth: 1.5,
                borderColor: '#0065FF', // Blue color for radio button
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {selectedAddress?.id === item.id && (
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 8,
                    backgroundColor: '#0065FF', // Blue color for selected radio button
                  }}
                />
              )}
            </View>
          </View>

          <View style={{ flex: 1,marginLeft:6 }}>
            <Text style={{fontSize:16,marginBottom:2}}>Name: {item.name}</Text>
            <Text style={{fontSize:16,marginBottom:2}}>Email: {item.email}</Text>
            <Text style={{fontSize:16,marginBottom:2}}>Phone Number: {item.phone}</Text>
            <Text style={{fontSize:16,marginBottom:2}}>Address: {item.address}</Text>
          </View>
        </TouchableOpacity>
      );
    };
  
  return (
    <>
    <View style={styles.container}>
        <View style={[styles.wrapper, { flex: 0.8 }]}>
          <AppointmentHeader title={'Address'}/>
        </View>

        <View style={{ flex: 0.8 }}>
          <FlatList
            data={addresses}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>

        <View style={{flex:0.8}}>
        <TouchableOpacity onPress={()=>navigation.navigate('AddAddress')} style={{borderWidth:0.5,paddingVertical:16,borderColor:'#00000040',borderRadius:10,marginHorizontal:30,alignItems:'center'}}>
            <Text style={{fontSize:20}}>Add New Address +</Text>
        </TouchableOpacity>
        </View>

        <View style={{alignItems:'center',marginTop:20,marginBottom:20,justifyContent:'flex-end',flex:0.8}}>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('ProfileScreen')}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>

    </View>
    </>
  )
}

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
      addressItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
      },
      selectedAddressItem: {
        backgroundColor: '#e0e0e0', // Background color for selected address
      },
      addressText: {
        flex: 1,
        fontSize: 16,
        marginLeft: 10,
      },
      checkbox: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'blue', // Color of the checkbox border
        backgroundColor: 'blue', // Color of the filled checkbox
      },
    });