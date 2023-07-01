import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

import moment from 'moment';

const ITEM_WIDTH = 100;
const ITEM_MARGIN_RIGHT = 10;


export default function DatePicker(){

    const [monthID, setMonthId] = useState(moment().month())
    const [day, setDay] = useState(moment().format('DD'))

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

    return(
        <View style={styles.container}>
            <View style={{flex: 1}}>
                <FlatList 
                    data={months}
                    renderItem={renderItem}
                    horizontal={true}
                    initialScrollIndex={4}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index}
                    getItemLayout={getItemLayout}
                />
                <FlatList 
                    data={days[monthID]}
                    renderItem={renderDays}
                    horizontal={true}
                    initialScrollIndex={4}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index}
                    getItemLayout={getItemLayout}
                />
                </View>
                <View style={styles.infoContainer}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <Text style={styles.infoText}>%</Text>
                        <Text style={styles.infoText}>Total</Text>
                        <Text style={styles.infoText}>VAT</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <Text style={[styles.infoText, {fontSize: 24}]}>()</Text>
                        <Text style={[styles.infoText, {fontSize: 24}]}>£40.95</Text>
                        <Text style={[styles.infoText, {fontSize: 24}]}>£8.73</Text>
                    </View>
                </View>
            <View style={{flex: 3}}></View>
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
      infoContainer: {
        flex: 1, 
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        margin: 10,
      },
      infoText: {
        fontWeight: 300,
        fontSize: 32
      }
});