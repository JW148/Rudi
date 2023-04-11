import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";

import BottomSheet from '@gorhom/bottom-sheet';
import { AntDesign } from "@expo/vector-icons";

export default function MeatMenu({setMeatOpen, total, setTotal, products}){

    // bottomShelf variables
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["100%"], []);


  //onPress function
  const handleOnPress = (name) => {
    let product = products.find(o => o.name === name);
    setTotal(+(total + product.price).toFixed(3));
  };

    return( 
        <BottomSheet
        style={styles.container}
        snapPoints={snapPoints}
        ref={bottomSheetRef}
      >
        <View style={{flexDirection: 'column', flex: 1}}>
        <View style={styles.row}>
      <TouchableOpacity style={styles.button} onPress={() => handleOnPress('Pastrami')}>
        <Text>Pastrami</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleOnPress('Muffa')}>
        <Text>Muffa</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.row}>
      <TouchableOpacity style={styles.button} onPress={() => handleOnPress('Salami')}>
        <Text>Salami</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleOnPress('HamMozz')}>
        <Text>HamMozz</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.row}>
      <TouchableOpacity style={styles.button} onPress={() => handleOnPress('Vanezia')}>
        <Text>Vanezia</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleOnPress('Tuna')}>
        <Text>Tuna</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.row}>
      <TouchableOpacity style={styles.button} onPress={() => handleOnPress('Chicken')}>
        <Text>Chicken</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleOnPress('Paris')}>
        <Text>Paris</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <View style={{flex: 1}}></View>
      <TouchableOpacity style={[styles.button, {flex: 2}]} onPress={() => handleOnPress('BLT')}>
        <Text>BLT</Text>
      </TouchableOpacity>
      <View style={{flex: 1}}></View>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={() => {setMeatOpen(false);}}>
          <AntDesign name="closecircle" size={32} color="#DDDDDD" />
        </TouchableOpacity>
      </View>
      </View>
      </BottomSheet>
    )
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