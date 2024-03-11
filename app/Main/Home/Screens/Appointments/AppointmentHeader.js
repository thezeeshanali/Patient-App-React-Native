// Header.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Entypo, MaterialIcons,Ionicons  } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AppointmentHeader = ({ title, showBackButton = true, showMoreButton=true, moreIconName = 'more-vert' }) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <>
    <View style={{ flex: 0.4, alignItems: "center" }}>
    {showBackButton && (
        <TouchableOpacity
        style={styles.backButton}
        onPress={handleBackPress}
        >
        <Entypo name="chevron-small-left" size={30} color="black" />
        </TouchableOpacity>
    )}
    </View>
    <View style={{ flex: 0.8,alignItems:"center"}}>
        <Text style={styles.titleText}>{title}</Text>
    </View>
    <View style={{ flex: 0.4, alignItems: "center" }}>
    {showMoreButton && (
        <TouchableOpacity
        style={styles.backButton}
        // onPress={()=>navigation.navigate(moreIconName)}
        >
            {/* Use the moreIconName prop to specify the icon */}
            {moreIconName === 'more-vert' ? (
              <MaterialIcons name={moreIconName} size={30} color="black" />
            ) : (
              <Ionicons name={moreIconName} size={30} color="black" 
                onPress={()=>navigation.navigate('SettingsScreen')}
               />
            )}
        </TouchableOpacity>
    )}
    </View>

    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: '#000',
    marginLeft: 16,
  },
  backButton: {
    marginRight: 26,
    borderWidth: 0.5,
    borderColor: "#00000024",
    padding:5
  },
  titleText: {
    fontSize: 22,
    fontWeight: "700",
    // marginLeft: 100,
  },
});

export default AppointmentHeader;
