import React, {useState} from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, TouchableOpacity, Text, StatusBar } from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import { stock } from '../Data';
import Items from './stock/Items';

export default function Stock(){

    const DATA = [
        {
            title: "Ingredients",
            id: 1
        },
        {
            title: "Treats",
            id: 2
        },
        {
            title: "Coffee",
            id: 3
        },
        {
            title: "Misc",
            id: 4
        },
        {
            title: "Pastries",
            id: 5
        },
        {
            title: "Drinks",
            id: 6
        },
        {
            title: "Crisps",
            id: 7
        },
        {
            title: "Soup",
            id: 8
        }
    ];

    const [itemsOpen, setItemsOpen] = useState(false);

    const Item = ({title}) => (
        <View style={{flex:1}}>
        <TouchableOpacity style={styles.button} onPress={() => setItemsOpen(true)}>
        <Text style={{fontSize: 32}}>{title}</Text>
      </TouchableOpacity>
      </View>
      );

    return(
        <GestureHandlerRootView style={{flex:1}}>
        <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        numColumns={2}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
    {
        itemsOpen && (
            <Items 
                setItemsOpen={setItemsOpen}
            />
        )
    }
    </GestureHandlerRootView>
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