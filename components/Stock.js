import React, {useState} from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, TouchableOpacity, Text, StatusBar } from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import { stock } from '../Data';

export default function Stock(){

    const DATA = [
        {
            title: "Ingredients"
        },
        {
            title: "Treats"
        },
        {
            title: "Coffee"
        },
        {
            title: "Misc"
        },
        {
            title: "Pastries"
        },
        {
            title: "Drinks"
        },
        {
            title: "Crisps"
        },
        {
            title: "Soup"
        }
    ]

    const Item = ({title}) => (
        <View style={{flex:1}}>
        <TouchableOpacity style={styles.button} onPress={() => handleOnPress('Soup')}>
        <Text style={{fontSize: 32}}>{title}</Text>
      </TouchableOpacity>
      </View>
      );

    return(
        <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        numColumns={2}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>

)};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    title: {
      fontSize: 32,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DDDDDD',
        borderColor: 'black',
        padding:10,
        margin: 5,
        flex: 1,
        borderRadius: 5,
      },
  });