import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	StyleSheet,
} from "react-native";
import DoctorItem from "./DoctorItem";
import docGQL from "../../../gql/home";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const DoctorsList = () => {
	const navigation = useNavigation();
	const roleId = "01b52de4-c67a-4e83-9a8d-105debb66224";

	const {
		loading: loadingDoctors,
		error: errorDoctors,
		data: doctorsData,
		refetch: refetchDoctors,
	} = useQuery(docGQL.GET_DOCTORS, {
		variables: { input: { roleId: roleId } },
	});

	React.useEffect(() => {
		console.log("Query called!");
	}, [doctorsData]); // Log when doctorsData changes

	// console.log('22222222222222',JSON.stringify(doctorsData))

	return (
		<View style={styles.container}>
			{/* <View>
      <Text>doctorsData: {JSON.stringify(doctorsData)}</Text>
      </View>
      <TouchableOpacity style={{padding:10,alignItems:'center'}} onPress={()=>{refetchDoctors({input:{roleId: roleId}}),console.log(doctorsData)}}>
        <Text>refetch</Text>
      </TouchableOpacity> */}
			<View style={styles.header}>
				<Text style={styles.heading}>Available Doctors</Text>
				<TouchableOpacity onPress={() => navigation.navigate("Cardiologist")}>
					<Text style={styles.viewAll}>View All</Text>
				</TouchableOpacity>
			</View>

			{loadingDoctors ? (
				<Text style={{ marginLeft: 20, color: "green" }}>Loading....</Text>
			) : (
				<></>
			)}
			{errorDoctors ? (
				<Text style={{ marginLeft: 20, color: "red" }}>
					{errorDoctors?.message}
				</Text>
			) : (
				<></>
			)}

			<FlatList
				data={doctorsData?.getUsers?.data || []} // Use the data from the query
				horizontal
				style={{ marginLeft: 20 }}
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item) => item.id.toString()} // Assuming 'id' is a number
				renderItem={({ item }) => <DoctorItem doctor={item} />}
			/>

			{/* <FlatList
        data={doctors}
        style={{marginLeft:20}}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DoctorItem doctor={item} />}
      /> */}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginBottom: 20,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		marginBottom: 10,
	},
	heading: {
		fontSize: 22,
		fontWeight: "bold",
	},
	viewAll: {
		color: "#9869AD",
		fontSize: 18,
		fontWeight: "500",
	},
});

export default DoctorsList;
