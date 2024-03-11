import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import TopDoctor from './TopDoctor';

const topDoctors = [
  {
    id: '1',
    name: 'Dr. John Doe',
    profession: 'Cardiologist',
    online: true,
    rating: 4.5,
    image: require('../assets/doctor.png'),
  },
  {
    id: '2',
    name: 'Dr. Jane Smith',
    profession: 'Dermatologist',
    online: false,
    rating: 4.8,
    image: require('../assets/doctor.png'),
  },
  // Add more top doctors here
];

const TopDoctorsList = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Top Doctors</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={topDoctors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TopDoctor doctor={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  viewAll: {
    color: '#9869AD',
    fontSize: 18,
    fontWeight:'500'
  },
});

export default TopDoctorsList;
