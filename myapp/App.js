import { View, Text , StyleSheet , SafeAreaView } from 'react-native'
import React from 'react'
import { useState } from 'react';
import * as Calendar from 'expo-calendar';

const [selectedDate,setSelectedStartDate] = useState("")



export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      <Text>Calendar</Text>
      <CalendarPicker onDateChange={setSelectedStartDate} />

    
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignContent:"center",
    alignItems:"center"
  }
})