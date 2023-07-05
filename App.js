import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Logs } from 'expo';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Till from './components/Till';
import Stock from './components/Stock';
import Sales from './components/Sales';
import { getDocs, createDoc, deleteDoc, updateDoc, getStatus, getSalesWithDate } from './utils/Requests';

 
export default function App() {
  Logs.enableExpoCliLogging();

  // useEffect(()=>{
  //   deleteDoc("64441365996cc25425d71964").then((response)=>{
  //     console.log(response);
  //   }) 
  //   .catch((error)=>{
  //     console.log(error);
  //   })  
  // });   
  
  // useEffect(()=>{
  //   updateDoc({id: '644001d4b9ae44bb6aaf8c69', name: "BACON"}).then((response)=>{
  //     console.log(response);
  //   }) 
  //   .catch((error)=>{
  //     console.log(error);
  //   })  
  // });  

  // useEffect(()=>{
  //   create().then(response => response.json())
  //   .then(json => {
  //     return json.body;
  //   }).catch(err => {
  //     console.error(err);
  //   })
  // })

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
  
  const [status, setStatus] = useState('Offline')   

  useEffect(()=>{   
    console.log("call")  
    getStatus().then(res => {
      if(res.status === "OK"){
        setStatus('Connected');
      }else{
        setStatus('Offline'); 
      }
    }); 
  }, []); 

  const Drawer = createDrawerNavigator();
  
  return (

    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Till">
        <Drawer.Screen 
          name="Till"
          component={Till} 
          options={({ navigation, route }) => ({
            headerRight: () => (
              <Text style={{paddingRight: 5}}>{status}</Text>
            ),
          })}
        />
        <Drawer.Screen 
          name="Stock" 
          component={Stock}
          options={({ navigation, route }) => ({
            headerRight: () => (
              <Text style={{paddingRight: 5}}>{status}</Text>
            ),
          })}
          />
          <Drawer.Screen 
          name="Sales" 
          component={Sales}
          options={({ navigation, route }) => ({
            headerRight: () => (
              <Text style={{paddingRight: 5}}>{status}</Text>
            ),
          })}
          />
      </Drawer.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  
});
