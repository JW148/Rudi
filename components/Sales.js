import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import DatePicker from './sales/DatePicker';
import Transaction from './sales/Transaction';

import moment from 'moment';
import { getSalesWithDate } from '../utils/Requests';

export default function Sales(){

    const [monthID, setMonthId] = useState(moment().month());
    const [day, setDay] = useState(moment().format('D'));
    const [transactions, setTransactions] = useState([]);
    const [total, setTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [net, setNet] = useState(0);

    useEffect(()=>{
        //calculate the total for the day
        let i = 0;
        transactions.forEach(el => {
            i += el.total;
        })
        setTotal(i);

        let j = 0;
        //calculate the taxable amount for the day
        transactions.forEach(el => {
            el.items.forEach(item => {
                if(item.taxable === "yes"){
                   j = +(j + item.price).toFixed(3)
                };
            })
        })
        setTax(j);
        //Net total (total minus VAT)
        setNet(total - tax);
    }, [transactions])


    useEffect(()=>{
        getSalesWithDate(`${day}-${monthID+1}-2023`).then(res => setTransactions(res)); 
    }, [day])

    useEffect(()=>{
        getSalesWithDate(`${day}-${monthID+1}-2023`).then(res => setTransactions(res));
    }, [monthID])

    return(
        <View style={styles.container}>
            <DatePicker
                monthID={monthID}
                setMonthId={setMonthId}
                day={day}
                setDay={setDay}
            /> 
            <View style={styles.infoContainer}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <Text style={styles.infoText}>Net</Text>
                        <Text style={styles.infoText}>Total</Text>
                        <Text style={styles.infoText}>VAT</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <Text style={[styles.infoText, {fontSize: 24}]}>£{net}</Text>
                        <Text style={[styles.infoText, {fontSize: 24}]}>£{total}</Text>
                        <Text style={[styles.infoText, {fontSize: 24}]}>£{tax}</Text>
                    </View>
                </View>
            <View style={{flex: 3}}>
                <Transaction 
                    transactions={transactions}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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