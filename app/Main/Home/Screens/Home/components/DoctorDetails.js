import { Entypo, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import moment from "moment";
import { useRoute } from "@react-navigation/native";
import docGQL from "../../../gql/home";
import { useQuery } from "@apollo/client";

const windowWidth = Dimensions.get("window").width;

LocaleConfig.locales["en"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};

LocaleConfig.defaultLocale = "en";

const DoctorDetails = ({ navigation, doctor }) => {
  const route = useRoute();
  const [doctorDetail, setDoctorDetail] = useState(route.params.doctor);

  const [currentDate, setCurrentDate] = useState(moment());
  const minDate = moment().startOf("month").subtract(1, "month").toDate();
  const maxDate = moment().endOf("month").add(1, "month").toDate();
  const [activeTime, setActiveTime] = useState(null); // Store the active time

  const doctorId = doctorDetail?.id;
  console.log(doctorId);
  // Define the list of timings
  const timings = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"];

  // Function to handle timing selection
  const handleTimeSelection = (time) => {
    setActiveTime(time); // Set the active time when clicked
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.7 }}>
        <ImageBackground source={{ uri: doctorDetail?.profilePicUrl }}>
          <View style={{ flex: 1, width: 500 }}>
            <View
              style={{
                marginHorizontal: 90,
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 60,
              }}
            >
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Entypo name="chevron-small-left" size={36} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.backButton}>
                <Entypo name="heart-outlined" size={36} color="#333" />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={{ flex: 1, bottom: 26 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: "#fff",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 20,
            }}
          >
            <View style={{ marginTop: 20 }}>
              <Text
                style={styles.doctorName}
              >{`${doctorDetail?.firstName} ${doctorDetail?.lastName}`}</Text>
              <Text style={styles.doctorProfession}>
                {doctorDetail?.category}{" "}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <MaterialIcons
                name="star"
                size={20}
                style={{ marginTop: 8 }}
                color="#FFA114"
              />
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>4.5</Text>
                <Text style={styles.ratingsText}>Ratings</Text>
              </View>
            </View>
          </View>
          <View style={{ padding: 20 }}>
            <Text style={{ color: "#000", fontSize: 18, lineHeight: 22 }}>
              A Doctor of Medicine (MD) or Bachelor of Medicine, Bachelor of
              Surgery (MBBS) is a medical professional with comprehensive
              training in diagnosing, treating, and preventing illnesses. MBBS
              doctors are dedicated to promoting health and well-being through
              medical expertise and patient care
            </Text>
          </View>
        </ScrollView>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("BookAppointment", {
                doctorId: doctorDetail?.id,
              })
            }
          >
            <Text style={styles.buttonText}>Book appointment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  backButton: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 4,
    padding: 5,
  },
  doctorName: {
    // marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  doctorProfession: {
    fontSize: 18,
    color: "#000",
  },
  ratingContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // marginTop: 5,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  ratingsText: {
    marginLeft: 5,
    fontSize: 18,
  },
  timesContainer: {
    flex: 1,
    justifyContent: "center",
    // alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  timingsContainer: {
    flexDirection: "row", // Display times in a row
    flexWrap: "wrap", // Wrap to the next row when there's no space
  },
  timingContainer: {
    flexBasis: "33%", // Each time container takes up 33% of the row (3 times in a row)
    // alignItems: 'center', // Center times horizontally in the container
    marginBottom: 10, // Add spacing between rows
  },
  lastInRow: {
    marginRight: 0, // Remove right margin for the last time in a row
  },
  timing: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#00000050",
    alignItems: "center",
  },
  activeTiming: {
    backgroundColor: "#9869AD",
  },
  timingText: {
    fontSize: 14,
    // fontWeight: 'bold',
    color: "black",
  },
  activeTimingText: {
    fontSize: 14,
    // fontWeight: 'bold',
    color: "#fff",
  },
  button: {
    width: windowWidth - 40,
    height: 45,
    backgroundColor: "#4BBDE5",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 21,
    letterSpacing: 0,
    color: "white",
    textTransform: "uppercase",
  },
});

export default DoctorDetails;

{
  /* <View style={{padding:30}}>
        <View style={{padding:20,borderWidth:0.5,borderColor:'#00000030',borderRadius:10}}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View>
              <Text style={{color:'#666666',fontSize:16}}>Fees</Text>
              <Text style={{color:'#4BBDE5',fontSize:18,fontWeight:'800'}}>10.00SR</Text>
            </View>
            <View>
              <Text style={{color:'#666666',fontSize:16}}>Available Time</Text>
              <Text style={{color:'#000',fontSize:18,fontWeight:'800'}}>09:00AM - 10:00PM</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{flex:1}}>
        <Text style={{fontSize:20,fontWeight:'800',marginLeft:20}}>Select Your Date</Text>
      <View style={{alignItems:'center'}}>
      <Calendar
        current={currentDate.format('YYYY-MM-DD')}
        minDate={minDate.toISOString().split('T')[0]} // Convert the Date object to the required format
        maxDate={maxDate.toISOString().split('T')[0]}
        onDayPress={(day) => setCurrentDate(moment(day.dateString))}
        hideExtraDays={true}
        markedDates={{
          [currentDate.format('YYYY-MM-DD')]: { selected: true, marked: true, selectedColor: '#9869AD', dotColor: 'white' },
        }}
      />
      </View>
    </View>

    <View style={styles.timesContainer}>
      <Text style={styles.heading}>Schedules</Text>
      <View style={styles.timingsContainer}>
      {timings.map((time, index) => (
        <View
          key={index}
          style={[
            styles.timingContainer,
            (index + 1) % 3 === 0 && styles.lastInRow, // Add this style for the last time in a row
          ]}
        >
          <TouchableOpacity
            style={[
              styles.timing,
              activeTime === time && styles.activeTiming,
            ]}
            onPress={() => handleTimeSelection(time)}
          >
            <Text
              style={[
                styles.timingText,
                activeTime === time && styles.activeTimingText,
              ]}
            >
              {time}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
    </View> */
}
