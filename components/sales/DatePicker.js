import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

import moment from 'moment';

const ITEM_WIDTH = 100;
const ITEM_MARGIN_RIGHT = 10;

export default function DatePicker({monthID, setMonthId, day, setDay}){

    //get calander data
    let months = moment.monthsShort();
    let days = []
    for(i=1;i<=11;i++){
        days.push(Array.from(Array(moment(`2023-${i}`).daysInMonth()), (_, i) => i + 1))
    }
    
    //flatlist functions and reference
    const getItemLayout = (_, index) => {
        return {
          length: ITEM_WIDTH + ITEM_MARGIN_RIGHT,
          offset: (ITEM_WIDTH + ITEM_MARGIN_RIGHT) * (index - 1),
          index,
        };
    };

    const renderItem = ({item, index}) => (
        <TouchableOpacity style={styles.item} onPress={() => setMonthId(index)}>
          <Text style={index === monthID ? styles.monthsSelected : styles.months}>{item}</Text>
        </TouchableOpacity>
    );

    const renderDays = ({item, index}) => (
        <TouchableOpacity style={item === day ? styles.daysSelected : styles.days} onPress={() => setDay(item)}>
          <Text style={[styles.months, {color: item === day ? 'white' : 'black'}]}>{item}</Text>
        </TouchableOpacity>
    );

    //keep track of day and month states to request new data from the db


    return(
        <View style={styles.container}>
                <FlatList 
                    data={months}
                    renderItem={renderItem}
                    horizontal={true}
                    initialScrollIndex={monthID}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index}
                    getItemLayout={getItemLayout}
                />
                <FlatList 
                    data={days[monthID]}
                    renderItem={renderDays}
                    horizontal={true}
                    initialScrollIndex={day}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index}
                    getItemLayout={getItemLayout}
                />
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        width: ITEM_WIDTH,
        marginRight: ITEM_MARGIN_RIGHT,
        justifyContent: 'center',
        alignItems: 'center'
      },
      months: {
        fontSize: 24,
        fontWeight: 300
      },
      monthsSelected: {
        fontSize: 32,
        fontWeight: 500
      },    
      days: {
        width: ITEM_WIDTH,
        marginRight: ITEM_MARGIN_RIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        borderRadius: 15
      },
      daysSelected: {
        width: ITEM_WIDTH,
        marginRight: ITEM_MARGIN_RIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: '#B90016',
      },
});