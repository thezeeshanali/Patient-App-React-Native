import { View, Text, StyleSheet, Image, FlatList,TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import AppointmentHeader from './AppointmentHeader';
import { FontAwesome, AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ProgressBar, MD3Colors,List } from 'react-native-paper';
const windowWidth = Dimensions.get("window").width;

export default function ProfileScreen({navigation}) {
    const [percentage, setPercentage] = useState(60); 

    const buttons = [
        {
          key: 'profile',
          label: 'Profile',
          icon: <FontAwesome name="user" size={24} style={styles.iconStyle} color={'#9869AD'} />,
        },
        {
          key: 'MyAppointments',
          label: 'My Appointments',
          icon: <Ionicons name="calendar" size={24} style={styles.iconStyle} color={'#9869AD'} />,
        },
        {
          key: 'Tracking',
          label: 'Tracking',
          icon: <Ionicons name="locate" size={24} style={styles.iconStyle} color={'#9869AD'} />,
        },
        {
          key: 'prescriptionReport',
          label: 'Prescription/Report',
          icon: <MaterialIcons name="description" size={24} style={styles.iconStyle} color={'#9869AD'} />,
        },
        {
          key: 'history',
          label: 'History',
          icon: <MaterialIcons name="history" size={24} style={styles.iconStyle} color={'#9869AD'} />,
        },
        {
          key: 'contactUs',
          label: 'Contact Us',
          icon: <Ionicons name="mail" size={24} style={styles.iconStyle} color={'#9869AD'} />,
        },
      ];
    
      const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleButtonPress(item.key)} style={styles.buttonContainer}>
          <List.Item
            title={item.label}
            titleStyle={styles.buttonLabel}
            left={() => item.icon}
          />
        </TouchableOpacity>
      );

      const handleButtonPress = (buttonKey) => {
        // Handle button press, navigate to the respective screen, or perform actions.
        navigation.navigate(buttonKey); 
        console.log(`Button pressed: ${buttonKey}`);
      };
    

  return (
    <>
    <View style={styles.container}>
        <View style={[styles.wrapper, { flex: 0.4 }]}>
          <AppointmentHeader title={'Profile'} moreIconName='settings'/>
        </View>
        <View style={{flex:1}}>
        <View style={{width: 100, height: 100, borderRadius: 70, backgroundColor: '#F5F5F5',alignItems: 'center',justifyContent: 'center',alignSelf:'center'}}>
            <FontAwesome name="user" size={70} color="#CCCCCC" />
        </View>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:18,fontWeight:'600',marginTop:10}}>Tayyab</Text>
            <View style={{marginLeft:8}}>
            <TouchableOpacity>
                 <AntDesign name="edit" size={22} color="#AAAAAA" />
            </TouchableOpacity>
            </View>
        </View>
        <View style={{ padding: 20, alignItems: 'center' }}>
        <ProgressBar
            progress={percentage / 100}
            color="#9869AD"
            style={{ width: 220,height:6}} 
        />
        <Text style={{ marginTop: 16, fontSize: 16, fontWeight: '500', color: '#000' }}>
            {percentage}% Complete your profile
        </Text>
        </View>
        <View style={{}}>
            <FlatList
            data={buttons}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
            style={{paddingHorizontal:30,marginBottom:120}}
            />
        </View>
        </View>

        <View style={{alignItems:'center',marginTop:20,marginBottom:20,justifyContent:'flex-end',flex:0.4}}>
            <TouchableOpacity style={styles.button} onPress={()=>console.log('LOGOUT')}>
                <Text style={styles.buttonText}>Logout</Text>
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
      buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginVertical:8,
        borderWidth:0.5,
        borderColor:'#00000030',
        borderRadius:10,
    },
      buttonLabel: {
        // marginLeft: 16,
        fontSize: 16,
        fontWeight:'700'
      },
      iconStyle:{
        backgroundColor:'#9869AD4D',
        padding:5,
        borderRadius:5
    },
    button: {
        width: windowWidth - 60,
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

});