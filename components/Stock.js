import React, {useState} from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, TouchableOpacity, Text, StatusBar } from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import { stock } from '../Data';
import Items from './stock/Items';
import NewItem from './stock/NewItem';
import { useDispatch, useSelector } from 'react-redux';
import {increment, decrement} from '../Redux/features/counter/counterSlice' 
import { useGetIngredientsQuery } from '../Redux/features/api/apiSlice';

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

    const {
        data: ingredients,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetIngredientsQuery()

    let result
    if(isLoading){
        console.log("isLoading...")
    }else if(isSuccess){
        console.log(ingredients)
    }else if(isError){
        console.log(error.toString())
    }

    const [itemsOpen, setItemsOpen] = useState(false);
    const [newItemOpen, setNewItemOpen] = useState(false);

    const Item = ({title}) => (
        <View style={{flex:1}}>
            <TouchableOpacity style={styles.button} onPress={() => setItemsOpen(true)}>
                <Text style={{fontSize: 32}}>{title}</Text>
            </TouchableOpacity>
        </View>
      );

      //Redux hooks to interact with the Redux store
      //read data from the store using useSelector
      const count = useSelector(state => state.counter.value)
      //dispatch actions using useDispatch
      const dispatch = useDispatch()

    return(
    <GestureHandlerRootView style={{flex:1}}>
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                numColumns={2}
                renderItem={({item}) => <Item title={item.title} />}
                keyExtractor={item => item.id}
            />
            <View style={{flex:1}}>
                <TouchableOpacity style={styles.button} onPress={() => dispatch(increment())}>
                    <Text style={{fontSize: 32}}>Inc</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex:1}}>
                <TouchableOpacity style={styles.button} onPress={() => dispatch(decrement())}>
                    <Text style={{fontSize: 32}}>Dec</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex:1}}>
                <Text style={{alignSelf: 'center', fontSize: 30}}>{count}</Text>
            </View>
    </SafeAreaView>
    {
        itemsOpen && (
            <Items 
                setItemsOpen={setItemsOpen}
                setNewItemOpen={setNewItemOpen}
            />
        )
    }
    {
        newItemOpen && (
            <NewItem 
                setNewItemOpen={setNewItemOpen}
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