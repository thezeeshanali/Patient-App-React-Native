import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TopDoctor = ({ doctor }) => {
  return (
    <View style={styles.doctorItem}>
      <Image source={doctor.image} style={styles.doctorImage} />
      <View style={{marginLeft:20}}>
        <Text style={styles.doctorName}>{doctor.name}</Text>
        <Text style={styles.doctorProfession}>{doctor.profession}</Text>
        <View style={{flexDirection:'row',justifyContent:'space-between',width:'64%'}}>
            <View style={styles.statusContainer}>
                {/* <MaterialIcons name="circle" size={12} color={doctor.online ? 'green' : 'gray'} /> */}
                <Text style={[styles.statusText, { color: doctor.online ? '#38C976' : 'gray',backgroundColor: doctor.online ? '#38C97630' : '#cccccc80' }]}>
                {doctor.online ? 'Online' : 'Offline'}
                </Text>
            </View>
            <View style={styles.ratingContainer}>
                <MaterialIcons name="star" size={18} color='#FFA114'/>
                <Text style={styles.ratingText}>({doctor.rating})</Text>
            </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  doctorItem: {
    marginBottom: 20,
    alignItems: 'center',
    flexDirection:'row',
    borderWidth: 1.6,
    borderColor: '#cccccc55',
    padding:8,
    borderRadius:10,
  },
  doctorImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  doctorName: {
    // marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  doctorProfession: {
    fontSize: 14,
    color: '#000',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    
  },
  statusText: {
    // marginLeft: 5,
    fontSize: 15,
    padding:5,
    fontWeight:'500'
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TopDoctor;
