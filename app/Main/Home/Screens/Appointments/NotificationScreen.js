import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import AppointmentHeader from './AppointmentHeader'

export default function NotificationScreen() {
    
const notificationsData = [
    { id: '1', time:'Today 10:55', text: 'Appointment number #50445632001 your doctor is on the way.', unread: false },
    { id: '2', time: 'Yesterday 05:10', text: 'Appointment number #40445635021 is completed, we wish you a speed recovery.', unread: true },
    // Add more notifications as needed
  ];
  
    const [notifications, setNotifications] = useState(notificationsData);
  
    const markAsRead = (id) => {
      const updatedNotifications = notifications.map((notification) =>
        notification.id === id ? { ...notification, unread: true } : notification
      );
      setNotifications(updatedNotifications);
    };
  
    const renderItem = ({ item }) => {
      return (
        <View style={{paddingHorizontal:5,paddingVertical:20,borderWidth:0.5,borderColor:'#00000050',borderRadius:10,marginBottom:20}}>
        <TouchableOpacity
          onPress={() => markAsRead(item.id)}
        >
        <View style={item.unread ? styles.unreadNotification : styles.readNotification}>
          <View style={item.unread ? styles.unReadDot : styles.readDot} />
          <Text style={item.unread ? styles.notificationUnreadTime : styles.notificationTime}>{item.time}</Text>
        </View>
          <Text style={item.unread ? styles.notificationUnreadText : styles.notificationText}>{item.text}</Text>
        </TouchableOpacity>
        </View>
      );
    };
  return (
    <View style={styles.container}>
        <View style={[styles.wrapper, { flex: 0.1 }]}>
          <AppointmentHeader title={'Notification'}/>
        </View>
        <View style={{flex:0.8,padding:20}}>
            <View>
                <FlatList
                    data={notifications}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#fff',
        },
        wrapper: {
            flexDirection: "row",
            alignItems: "center",
        },  
        unreadNotification: {
            flexDirection: 'row',
            alignItems: 'center',
            // backgroundColor: 'lightblue',
            marginBottom: 10,
            paddingHorizontal: 10,
          },
          readNotification: {
            flexDirection: 'row',
            alignItems: 'center',
            // backgroundColor: 'lightgray',
            marginBottom: 10,
            paddingHorizontal: 10,
          },
          readDot: {
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: '#0085FE',
            marginRight: 10,
          },
          unReadDot: {
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: '#AAAAAA',
            marginRight: 10,
          },
          notificationTime:{
            fontSize:20,
            fontWeight:'700',
            color:'#000'
          },
          notificationUnreadTime:{
            fontSize:20,
            fontWeight:'700',
            color:'#666666'
          },
          notificationText: {
            color: 'black',
            fontSize:18,
            marginLeft:30
          },
          notificationUnreadText: {
            color: '#6666666',
            fontSize:18,
            marginLeft:30
          },
    });