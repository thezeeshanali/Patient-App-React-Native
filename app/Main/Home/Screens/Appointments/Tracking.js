import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AppointmentHeader from './AppointmentHeader';
import { MaterialIcons } from '@expo/vector-icons';

const Tracking = () => {
  const [location, setLocation] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [currentRegion, setCurrentRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    // Request permission to access the user's location
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;

      setLocation({ latitude, longitude });
      setCurrentRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  return (
    <>
    <View style={styles.container}>
        <View style={[styles.wrapper, { flex: 0.2 }]}>
          <AppointmentHeader title={'Tracking'}/>
        </View>
        <View style={{padding:20,flex:1}}>
      <Text style={{ fontSize: 18, fontWeight:'600',marginBottom:10 }}>Select Your Location</Text>
      <View style={{flexDirection:'row',alignItems:"center",backgroundColor:'#F7F7F7',paddingHorizontal:10,marginBottom:20}}>
      <MaterialIcons
            name="search"
            size={28}
            color="black"
        />
      <TextInput
        style={{
          height: 40,
          fontSize:18,
          marginLeft:5
        }}
        placeholder="Current Location"
        placeholderTextColor={'#000'}
        // placeholder={currentRegion}
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />
      </View>
      <View style={{flex:1,borderRadius:16,overflow:'hidden'}}>
      <MapView
        style={{ flex: 1}}
        initialRegion={currentRegion}
        region={currentRegion}
      >
        {location && (
          <Marker coordinate={location}>
            {/* You can use a custom icon here */}
            <View
              style={{
                // backgroundColor: 'blue',
                padding: 5,
                borderRadius: 50,
              }}
            >
              <Text style={{ color: 'white',fontSize:20 }}>📍</Text>
            </View>
          </Marker>
        )}
      </MapView>
      </View>
      </View>
    </View>
    </>
  );
};

export default Tracking;

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
    });
