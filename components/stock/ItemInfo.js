import React from "react";
import { StyleSheet, View, SafeAreaView, FlatList, TouchableOpacity, Text, StatusBar } from 'react-native';

import BottomSheet from '@gorhom/bottom-sheet';

export default function ItemInfo({data}){
    
    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{data.name}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Used this week: {data.used}</Text>
                <Text style={styles.infoText}>Price £{data.price}</Text>
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
    infoContainer: {
        padding: 10,
        alignItems: 'center',
    },
    infoText: {
        fontSize: 17,
        fontWeight: "300",
    }
});