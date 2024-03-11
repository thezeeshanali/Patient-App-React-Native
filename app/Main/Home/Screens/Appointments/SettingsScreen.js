import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppointmentHeader from './AppointmentHeader';
import { ScrollView } from 'react-native';

const SettingsScreen = ({navigation}) => {
  const [editProfileEnabled, setEditProfileEnabled] = useState(true);
  const [changePasswordEnabled, setChangePasswordEnabled] = useState(true);

  return (
    <>
    <View style={styles.container}>
        <View style={[styles.wrapper, { flex: 0.1 }]}>
          <AppointmentHeader title={'Settings'} showMoreButton={false}/>
        </View>
    <View style={{flex:0.8,padding:20}}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>
        <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate('NotificationScreen')}>
          <Text style={{fontSize:16}}>Edit Profile</Text>
          <FontAwesome name="angle-right" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={{fontSize:16}}>Change Password</Text>
          <FontAwesome name="angle-right" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={{fontSize:16}}>Change Language</Text>
          <FontAwesome name="angle-right" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={{fontSize:16}}>Change Location</Text>
          <FontAwesome name="angle-right" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.toggleItem}>
          <Text style={{fontSize:16}}>Edit Profile</Text>
          <Switch
            value={editProfileEnabled}
            trackColor={{ false: '#767577', true: '#9869AD' }}
            thumbColor={editProfileEnabled ? '#fff' : '#f4f3f4'}
            onValueChange={() => setEditProfileEnabled(!editProfileEnabled)}
          />
        </View>
        <View style={styles.separator} />
        <View style={styles.toggleItem}>
          <Text style={{fontSize:16}}>Change Password</Text>
          <Switch
            value={changePasswordEnabled}
            trackColor={{ false: '#767577', true: '#9869AD' }}
            thumbColor={editProfileEnabled ? '#fff' : '#f4f3f4'}
            onValueChange={() => setChangePasswordEnabled(!changePasswordEnabled)}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Terms and Support</Text>
        <TouchableOpacity style={styles.item}>
          <Text style={{fontSize:16}}>Terms and conditions</Text>
          <FontAwesome name="angle-right" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={{fontSize:16}}>Privacy policy</Text>
          <FontAwesome name="angle-right" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={{fontSize:16}}>Support</Text>
          <FontAwesome name="angle-right" size={24} />
        </TouchableOpacity>
      </View>
      </ScrollView>
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
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingVertical: 10,
  },
  toggleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingVertical: 10,
  },
});

export default SettingsScreen;
