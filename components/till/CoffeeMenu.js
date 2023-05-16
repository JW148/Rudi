import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";

import BottomSheet from '@gorhom/bottom-sheet';
import { AntDesign } from "@expo/vector-icons";

export default function CoffeeMenu({setCoffeeOpen, handleOnPress={handleOnPress}}){

    // bottomShelf variables
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["100%"], []);

    return( 
        <BottomSheet
        style={styles.container}
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        backgroundStyle={{borderRadius: 1}}
      >
        <View style={{flexDirection: 'column', flex: 1}}>
        <View style={styles.row}>
      <TouchableOpacity style={styles.button} onPress={() => handleOnPress('Espresso')}>
        <Text>Espresso</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleOnPress('Americano')}>
        <Text>Americano</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleOnPress('Long Black')}>
        <Text>Long Black</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.row}>
      <TouchableOpacity style={styles.button} onPress={() => handleOnPress('Latte')}>
        <Text>Latte</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleOnPress('Flat White')}>
        <Text>Flat White</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleOnPress('Cappuccino')}>
        <Text>Cappuccino</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.row}>
      <TouchableOpacity style={styles.button} onPress={() => handleOnPress('Mocha')}>
        <Text>Mocha</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleOnPress('Hot Chocolate')}>
        <Text>Hot Chocolate</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleOnPress('Tea')}>
        <Text>Tea</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.row}>
      <TouchableOpacity style={styles.button} onPress={() => handleOnPress('Macchiato')}>
        <Text>Macchiato</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleOnPress('Cortado')}>
        <Text>Cortado</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleOnPress('Marocchino')}>
        <Text>Marocchino</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <View style={{flex: 1}}></View>
      <TouchableOpacity style={[styles.button, {flex: 2}]} onPress={() => handleOnPress('Extra Shot')}>
        <Text>Extra Shot</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, {flex: 2}]} onPress={() => handleOnPress('Syrup')}>
        <Text>Syrup</Text>
      </TouchableOpacity>
      <View style={{flex: 1}}></View>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={() => {setCoffeeOpen(false);}}>
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