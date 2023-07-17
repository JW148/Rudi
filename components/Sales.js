import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import DatePicker from './sales/DatePicker';
import Transaction from './sales/Transaction';

import moment from 'moment';

import { getSalesWithDate } from '../utils/Requests';
import Button from '../components/Button'
import PDF from './sales/PDF';
import { set } from 'react-native-reanimated';

export default function Sales(){

    const [monthID, setMonthId] = useState(moment().month());
    const [day, setDay] = useState(moment().format('D'));
    const [transactions, setTransactions] = useState([]);
    const [total, setTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [net, setNet] = useState(0);
    const [numOfTaxable, setNumOfTaxable] = useState(0);
    const [numSoup, setNumSoup] = useState(0);
    const [numKitKat, setNumKitKat] = useState(0);
    const [numCoffees, setNumCoffees] = useState(0);
    const [numDrinks, setNumDrinks] = useState(0);

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(()=>{
        //calculate the total for the day
        let i = 0;
        transactions.forEach(el => {
            i += el.total;
        })
        setTotal(i);
    }, [transactions])

    useEffect(()=>{
        let j = 0;
        let drinks = 0;
        let soup = 0;
        let coffee = 0;
        let kitkats = 0;
        let taxable = 0;
        //calculate the taxable amount for the day
        transactions.forEach(el => {
            el.items.forEach(item => {
                if(item.taxable === "yes"){
                    taxable++;
                   j += item.price;
                   console.log(item.type);
                //    switch(item.type){
                //     case 'drink':
                //         drinks++;
                //         break;
                //     case 'coffee':
                //         coffee++;
                //         break;
                //     case 'soup':
                //         soup++;
                //         break;
                //     case 'treats-other':
                //         kitkats++;
                //         break;
                //    }
                };
            })
            console.log(" ")
        })
        setTax(j);
        setNumOfTaxable(taxable);
        setNumCoffees(coffee);
        setNumDrinks(drinks);
        setNumSoup(soup);
        setNumKitKat(kitkats);
    }, [total])

    useEffect(()=>{
        //Net total (total minus VAT)
        setNet(total - tax);
    }, [tax])


    useEffect(()=>{
        setTotal(0);
        setTax(0);
        setNet(0);
        setNumOfTaxable(0);
        getSalesWithDate(`${day}-${monthID+1}-2023`).then(res => setTransactions(res)); 
    }, [day])

    useEffect(()=>{
        setTotal(0);
        setTax(0);
        setNet(0);
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
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', borderBottomWidth: 1}}>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={styles.infoText}>Net</Text>
                            <Text style={[styles.infoText, {fontSize: 24}]}>£{net.toFixed(2)}</Text>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={styles.infoText}>Total</Text>
                            <Text style={[styles.infoText, {fontSize: 24}]}>£{total.toFixed(2)}</Text>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={styles.infoText}>VAT</Text>
                            <Text style={[styles.infoText, {fontSize: 24}]}>£{tax.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>
            <View style={{flex: 4}}>
                { transactions && transactions ? <Transaction transactions={transactions}/> : <Text style={{alignSelf: 'center'}}>No data</Text>}
            </View>
            <View style={{flex: 1}}>
                <Button 
                    text={"End of Day"}
                    style={styles.button}
                    textStyle={styles.text}
                    handleOnPress={()=>setModalVisible(!modalVisible)}
                />
          </View>
            <PDF 
                transactions={transactions}
                appTotal={total}
                appVAT={tax}
                appNet={net}
                month={monthID + 1}
                day={day}
                numCoffees={numCoffees}
                numDrinks={numDrinks}
                numSoup={numSoup}
                numKitKat={numKitKat}
                numOfTaxable={numOfTaxable}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
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
      },
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#128026',
        borderColor: 'black',
        padding: 10,
        margin: 5,
        marginHorizontal: 10,
        flex: 1,
        borderRadius: 5,
      },
      text: {
        fontSize: 20,
        fontWeight: "300",
        padding: 4,
        alignSelf: 'center',
        color: 'white'
      },
});