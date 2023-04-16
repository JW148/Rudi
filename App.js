import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { Logs } from 'expo';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Till from './components/Till';
import { getData } from './utils/Requests';
import { stock } from './Data';


export default function App() {
  Logs.enableExpoCliLogging();

  useEffect(()=>{
    getData().then((response)=>{
      console.log(response);
    })
    .catch((error)=>{
      console.log(error);
    })
  });

  // const [records, setRecords] = useState([]);
 
//  This method fetches the records from the database.
//  useEffect(() => {
//    async function getRecords() {
//      const response = await fetch(`http://10.0.2.2:3000/getData/`);
 
//      if (!response.ok) {
//        const message = `An error occurred: ${response.statusText}`;
//        window.alert(message);
//        return;
//      }
 
//      const records = await response.json();
//      setRecords(records);
//    }
 
//    getRecords();
 
//    return;
//  }, [records.length]);

  const Drawer = createDrawerNavigator();
  
  return (

    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Till">
        <Drawer.Screen name="Till" component={Till} />
      </Drawer.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  
});
