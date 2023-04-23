import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

import BottomSheet from '@gorhom/bottom-sheet';
import { AntDesign } from "@expo/vector-icons";

import { getDocs, createDoc, deleteDoc } from "../../utils/Requests";


export default function Items({setItemsOpen}){
  //store stock item objects in an array
  const [stock, setStock] = useState([]);

  //get stock items
  useEffect(()=>{
    getDocs().then((response)=>{
      setStock(response);
      console.log(response);
    }) 
    .catch((error)=>{
      console.log(error);
    })  
  }, []);  

  //bottomsheet shiz
  const bottomSheetRef= useRef(null);
  const snapPoints = useMemo(() => ["100%"], []);

  return (
    <BottomSheet
      style={styles.container}
      snapPoints={snapPoints}
      ref={bottomSheetRef}
      backgroundStyle={{borderRadius: 1}}
    >
      <View style={{fex: 1}}>
        {
          stock.map((el, i) => (<Text>{el.name}</Text>))
        }
        <Text>{JSON.stringify(stock[0])}</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>trudes!!!!!!!!!!!!!!!!!
      <TouchableOpacity onPress={() => {setItemsOpen(false);}}>
          <AntDesign name="closecircle" size={32} color="#DDDDDD" />
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      paddingHorizontal: 5,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#DDDDDD',
      borderColor: 'black',
      padding: 10,
      margin: 5,
      flex: 1,
      borderRadius: 5,
    },
    row: {
      flex: 1,
      flexDirection: 'row',
    },
    text: {
        fontSize: 20
    }
  });