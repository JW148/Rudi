import React, {useState} from "react";
import { StyleSheet, View, SafeAreaView, FlatList, TouchableOpacity, Text, StatusBar, Button, Alert } from 'react-native';

import { AntDesign, Feather } from '@expo/vector-icons';
import { TouchableHighlight } from "react-native-gesture-handler";

export default function ItemInfo({data, removeItem}){

    const deleteAlert = () => 
        Alert.alert('Caution!', 'Are you sure you want to delete this item?', [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'OK',
                onPress: () => deleteItem()
            }
        ]);

    const deleteItem = () => {
        console.log('Deleting ' + data._id);
        removeItem(data._id);
    }
    
    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{data.name}</Text>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.amountContainer}>
                    <Text style={styles.infoText}>Amount in stock: {data.amntInStock}</Text>
                    <TouchableOpacity style={{marginHorizontal: 5}}>
                        <AntDesign name="pluscircleo" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.infoText}>0</Text>
                    <TouchableOpacity style={{marginHorizontal: 5}}>
                        <AntDesign name="minuscircleo" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.infoText}>Used this week: {data.used}</Text>
                <Text style={styles.infoText}>Unit price: £{data.price}</Text>
                <Text style={styles.infoText}>Used in: </Text>
                <View style={styles.usedInContainer}>
                {data.usedIn && data.usedIn.map((el, i) => {
                    console.log(i)
                    if(i === data.usedIn.length - 1){
                        return <Text style={styles.infoText}>{el}</Text>
                    }else{
                        return <Text style={styles.infoText}>{el}, </Text>
                    }
                })}
                </View>
            </View>
            <View style={styles.footerContainer}>
                <TouchableOpacity style={{marginHorizontal: 10}}>
                    <Feather name="edit" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteAlert} style={{marginHorizontal: 10}}>
                    <AntDesign name="delete" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        borderRadius: 5,
        backgroundColor: "#f5f5f5",
        alignItems: 'center',
        margin: 10
    },
    headerContainer: {
        borderBottomWidth: 2,
        borderBottomColor: "#515151",
        width: "70%",
        alignItems: 'center',
        padding: 10
    },  
    headerText: {
        fontSize: 20,
        fontWeight: "300",
    },
    infoText: {
        fontSize: 15,
        fontWeight: "300",
        padding: 4
    },  
    infoContainer: {
        padding: 15,
        alignItems: 'center',
    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    usedInContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 10,
        justifyContent: 'center'
    },
    amountContainer: {
        flexDirection: 'row'
    }
});