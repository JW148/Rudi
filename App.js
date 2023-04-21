import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Logs } from 'expo';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Till from './components/Till';
import Stock from './components/Stock';
import { getData, create } from './utils/Requests';


export default function App() {
  Logs.enableExpoCliLogging();
 
  useEffect(()=>{
    create().then((response)=>{
      console.log(response);
    }) 
    .catch((error)=>{
      console.log(error);
    })  
  }); 

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

  const Drawer = createDrawerNavigator();
  
  return (

    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Till">
        <Drawer.Screen name="Till" component={Till} />
        <Drawer.Screen name="Stock" component={Stock}/>
      </Drawer.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  
});
