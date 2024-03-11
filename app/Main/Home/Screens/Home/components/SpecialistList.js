import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const specialists = [
  {
    id: '1',
    name: 'John Doe',
    profession: 'Dhaka medical (Cardiologists)',
    image: require('../assets/doctor.png'),
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Jane Smith',
    profession: 'Dhaka medical (Dermatologist)',
    image: require('../assets/doctor.png'),
    rating: 4.2,
  },
  {
    id: '3',
    name: 'Jane Smith',
    profession: 'Dhaka medical (Dermatologist)',
    image: require('../assets/doctor.png'),
    rating: 4.2,
  },
  {
    id: '4',
    name: 'Jane Smith',
    profession: 'Dhaka medical (Dermatologist)',
    image: require('../assets/doctor.png'),
    rating: 4.2,
  },
  {
    id: '5',
    name: 'Jane Smith',
    profession: 'Dhaka medical (Dermatologist)',
    image: require('../assets/doctor.png'),
    rating: 4.2,
  },
  {
    id: '6',
    name: 'Jane Smith',
    profession: 'Dhaka medical (Dermatologist)',
    image: require('../assets/doctor.png'),
    rating: 4.2,
  },

  // Add more specialists as needed
];

const SpecialistList = ({ doctor }) => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.profilePicUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{`${item.firstName} ${item.lastName}`}</Text>
        <Text style={styles.profession}>{item.category}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.ratingContainer}>
            <Text style={styles.star}>★</Text>
            {/* <Text style={styles.rating}>({item.rating})</Text> */}
            <Text style={styles.rating}>({"4.5"})</Text>

          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('DoctorDetails', { doctor: item })}
            style={styles.detailsButton}
          >
            <Text style={styles.detailsButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={doctor}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 20,
    alignItems: 'center',
    flexDirection:'row',
    borderWidth: 1.6,
    borderColor: '#cccccc55',
    paddingVertical:20,
    paddingHorizontal:10,
    borderRadius:10
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  textContainer: {
    marginLeft:20,
    flex:1
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profession: {
    fontSize: 16,
    color: '#000',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  rating: {
    fontSize: 18,
  },
  star: {
    fontSize: 18,
    color: '#FFA114',
    marginRight: 5,
  },
  detailsButton: {
    backgroundColor: '#4BBDE5',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  detailsButtonText: {
    color: 'white',
    fontWeight: '800',
  },
});

export default SpecialistList;
