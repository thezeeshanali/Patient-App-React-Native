import { View, Text,StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import AppointmentHeader from './AppointmentHeader';
import DropDownPicker from 'react-native-dropdown-picker';
import { Formik } from 'formik';
import * as yup from 'yup';
import { ScrollView } from 'react-native';
const windowWidth = Dimensions.get("window").width;

export default function AddAddress({navigation}) {
    const validationSchema = yup.object().shape({
        fullName: yup.string().required('Full Name is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        phone: yup.string().matches(/^[0-9]+$/, 'Invalid phone number').required('Phone Number is required'),
        district: yup.string().required('District is required'),
        address: yup.string().required('Street Address is required'),
      });

      const [open, setOpen] = useState(false);
      const [value, setValue] = useState(null);    
      const [items, setItems] = useState([
        { label: "District1", value: "district1" },
        { label: "District2", value: "district2" },
        { label: "District3", value: "district3" },
      ]);
    
  return (
    <>
    <View style={styles.container}>
        <View style={[styles.wrapper, { flex: 0.3 }]}>
          <AppointmentHeader title={'Address'}/>
        </View>

        <ScrollView style={{flex:0.9}}>
        <Formik
        initialValues={{
            fullName: '',
            email: '',
            phone: '',
            district: '', 
            address: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
            // Handle form submission here
            console.log(values);
        }}
        >
        {(formikProps) => (
        <>
        <View style={{ padding: 20}}>
          <Text style={{ fontSize: 18, marginTop: 20 }}>Full Name</Text>
          <View style={{borderWidth: 0.5,borderColor: "#00000024",borderRadius: 5,flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10}}>
          <TextInput
            style={[styles.input,{flex:0.8}]}
            placeholder="Enter your name"
            onChangeText={formikProps.handleChange('fullName')}
            onBlur={formikProps.handleBlur('fullName')}
            value={formikProps.values.fullName}
          />
          </View>
          {formikProps.touched.fullName && formikProps.errors.fullName && (
            <Text style={{ color: 'red', marginTop:5 }}>{formikProps.errors.fullName}</Text>
          )}

        <Text style={{ fontSize: 18, marginTop: 20 }}>Email</Text>
          <View style={{borderWidth: 0.5,borderColor: "#00000024",borderRadius: 5,flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10}}>
          <TextInput
            style={[styles.input,{flex:0.8}]}
            placeholder="Enter your email"
            onChangeText={formikProps.handleChange('email')}
            onBlur={formikProps.handleBlur('email')}
            value={formikProps.values.email}
          />
          </View>
          {formikProps.touched.email && formikProps.errors.email && (
            <Text style={{ color: 'red', marginTop:5 }}>{formikProps.errors.email}</Text>
          )}

        <Text style={{ fontSize: 18, marginTop: 20 }}>Phone Number</Text>
          <View style={{borderWidth: 0.5,borderColor: "#00000024",borderRadius: 5,flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10}}>
          <TextInput
            style={[styles.input,{flex:0.8}]}
            placeholder="Mobile Number"
            onChangeText={formikProps.handleChange('phone')}
            onBlur={formikProps.handleBlur('phone')}
            value={formikProps.values.phone}
            keyboardType='Numeric'
          />
          </View>
          {formikProps.touched.phone && formikProps.errors.phone && (
            <Text style={{ color: 'red', marginTop:5 }}>{formikProps.errors.phone}</Text>
          )}

        <Text style={{fontSize:18,marginTop:20}}>District</Text>
        <View style={{zIndex:1}}>
            <DropDownPicker
                open={open}
                value={value}
                style={styles.input}
                setOpen={setOpen}
                setValue={setValue}
              items={items}
              setItems={setItems}
              defaultValue="Select District"
              textStyle={{ fontSize: 16, paddingVertical: 10, paddingHorizontal: 12 }}
              style={[styles.input,{flex:0.8,borderWidth: 0.5,borderColor: "#00000024",borderRadius: 5,marginVertical:10,}]}
              onSelect={(index, value) => formikProps.setFieldValue('district', value)}
            />
          </View>
          {formikProps.touched.district && formikProps.errors.district && (
            <Text style={{ color: 'red',marginTop:40 }}>{formikProps.errors.district}</Text>
          )}

        <Text style={{ fontSize: 18,marginTop:20 }}>Street Address</Text>
          <View style={{borderWidth: 0.5,borderColor: "#00000024",borderRadius: 5,flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10}}>
          <TextInput
            style={[styles.input,{flex:0.8}]}
            placeholder="Enter your address"
            onChangeText={formikProps.handleChange('address')}
            onBlur={formikProps.handleBlur('address')}
            value={formikProps.values.address}
            textAlignVertical='top'
            scrollEnabled={true}
            numberOfLines={5}
            multiline={true}
          />
          </View>
          {formikProps.touched.address && formikProps.errors.address && (
            <Text style={{ color: 'red', marginTop:5 }}>{formikProps.errors.address}</Text>
          )}

        </View>
        <View style={{alignItems:'center',marginTop:20,marginBottom:20,justifyContent:'flex-end',flex:0.8}}>
            {/* onPress={formikProps.handleSubmit} */}
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('AddressList')}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
        </>      
      )}
        </Formik>
        </ScrollView>
    </View>
    </>
  )
}

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
      input: {
        padding: 5,
        marginVertical: 5,
        marginLeft:5,
        fontSize:18
      },    
      button: {
        width: windowWidth - 40,
        height: 45,
        backgroundColor: "#4BBDE5",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        // marginBottom: 15,
      },
      buttonText: {
        fontSize: 16,
        fontWeight: "600",
        lineHeight: 21,
        letterSpacing: 0,
        color: "white",
        textTransform:'uppercase'
      },
});  