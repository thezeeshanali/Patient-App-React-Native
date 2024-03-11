import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import docGQL from "../../../gql/home";
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const DoctorItem = ({ doctor }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={()=>navigation.navigate('DoctorDetails', { doctor })}>
    <View style={styles.doctorItem}>
      <Image source={{ uri: doctor?.profilePicUrl }} style={styles.doctorImage} />
      <Text style={styles.doctorName}>{`${doctor?.firstName} ${doctor?.lastName}`}</Text>
      <Text style={styles.doctorProfession} numberOfLines={1}>{doctor?.category}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={styles.doctorFee}>{`Fee: $${doctor.patientDuration / 60}`}</Text>
        <View style={styles.ratingContainer}>
          <MaterialIcons name="star" size={18} color="#FFA114" />
          {/* <Text style={styles.ratingText}>{doctor.rating}</Text> */}
          <Text style={styles.ratingText}>{"4.5"}</Text>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  doctorItem: {
    marginRight: 20,
    width: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
  },
  doctorImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    alignSelf: 'center',
  },
  doctorName: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  doctorProfession: {
    fontSize: 15,
    color: '#000',
    textAlign: 'left',
    textTransform:'capitalize'
  },
  doctorFee: {
    fontSize: 14,
    textAlign: 'center',
    color:'#000',
    fontWeight:'500'
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DoctorItem;