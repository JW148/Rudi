import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

import moment from 'moment';

const ITEM_WIDTH = 100;
const ITEM_MARGIN_RIGHT = 10;

export default function DatePicker({day, setDay, monthID, setMonthID}){

  //get month names to render in the flatlist
  const months = moment.monthsShort();
    
    //gets the layout of the flatlist item to render and index correctly when using initialScrollIndex
    const getItemLayout = (_, index) => {
        return {
          length: ITEM_WIDTH + ITEM_MARGIN_RIGHT,
          offset: (ITEM_WIDTH + ITEM_MARGIN_RIGHT) * (index - 1),
          index,
        };
    };

    const renderMonths = ({item, index}) => (
        <TouchableOpacity style={styles.item} onPress={() => setMonthId(index)}>
          <Text style={index === monthID ? styles.monthSelected : styles.month}>{item}</Text>
        </TouchableOpacity>
    );

    const renderDays = ({item, index}) => (
      <TouchableOpacity style={(index+1) === parseInt(day) ? [styles.item, styles.daySelected] : [styles.item, styles.day]} onPress={() => setDay(index + 1)}>
        <Text style={[styles.month, {color: (index+1) === parseInt(day) ? 'white' : 'black'}]}>{item + 1}</Text>
      </TouchableOpacity>
  );

    return(
        <View style={styles.container}>
               <FlatList
                  data={months}
                  renderItem={renderMonths}
                  initialScrollIndex={monthID+1}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  keyExtractor={(item, index) => index}
                  getItemLayout={getItemLayout}
               />
               <FlatList
                  //get an array of the days in the current month and 
                  data={[...Array(moment(`2023-${monthID + 1}`, "YYYY-M").daysInMonth()).keys()]}
                  renderItem={renderDays}
                  initialScrollIndex={parseInt(day)}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
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
    month: {
      fontSize: 24,
      fontWeight: '300'
    },
    monthSelected: {
      fontSize: 32,
      fontWeight: '400'
    },
    day: {
      borderRadius: 15,
      backgroundColor: 'lightgrey'
    },
    daySelected: {
      borderRadius: 15,
      backgroundColor: '#B90016'
    }
});