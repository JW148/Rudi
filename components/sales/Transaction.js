import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

export default function Transaction({transactions}){

    const renderItem = ({item, index}) => (
        <View style={styles.info}>
            <Text style={styles.infoText}>Transaction ID: {item._id}</Text>
            <Text style={styles.infoText}>Total: £{item.total}</Text>
            <Text style={styles.infoText}>Time: {item.time}</Text>
            <Text style={styles.infoText}>Conditions: {item.weather.current.condition.text}</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                <Text style={styles.infoText}>Items:</Text>
            {item.items && item.items.map((el, i) => {
                    if(i === item.items.length - 1){
                        return <Text style={styles.infoText}>{el.name}</Text>
                    }else{
                        return <Text style={styles.infoText}>{el.name}, </Text>
                    }
                })}
            </View>
        </View>
    );

    return(
        <View style={styles.container}>
            <FlatList 
                data={transactions}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    info: {
        flexDirection: 'column',
        borderRadius: 10,
        backgroundColor: 'lightgrey',
        margin: 10,
        padding: 10
    },
    infoText: {
        fontSize: 20,
        fontWeight: "300",
        padding: 4
    }, 
});