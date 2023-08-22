import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import DatePicker from './sales/DatePicker';
import Transaction from './sales/Transaction';

import moment from 'moment';

import { getSalesWithDate } from '../utils/Requests';
import Button from '../components/Button'
import PDF from './sales/PDF';

import { useGetSalesQuery } from '../Redux/features/api/apiSlice';


export default function Sales(){

    const [monthID, setMonthID] = useState(moment().month());
    const [day, setDay] = useState(moment().format('D'));
    
    const [modalVisible, setModalVisible] = useState(false);

    // useEffect(()=>{
    //     //calculate the total for the day
    //     let i = 0;
    //     transactions.forEach(el => {
    //         i += el.total;
    //     })
    //     setTotal(i);
    // }, [transactions])

    // useEffect(()=>{
    //     let j = 0;
    //     let drinks = 0;
    //     let soup = 0;
    //     let coffee = 0;
    //     let kitkats = 0;
    //     let taxable = 0;
    //     //calculate the taxable amount for the day
    //     transactions.forEach(el => {
    //         el.items.forEach(item => {
    //             if(item.taxable === "yes"){
    //                 taxable++;
    //                j += item.price;
    //             //    switch(item.type){
    //             //     case 'drink':
    //             //         drinks++;
    //             //         break;
    //             //     case 'coffee':
    //             //         coffee++;
    //             //         break;
    //             //     case 'soup':
    //             //         soup++;
    //             //         break;
    //             //     case 'treats-other':
    //             //         kitkats++;
    //             //         break;
    //             //    }
    //             };
    //         })
    //     })
    //     setTax(j);
    //     setNumOfTaxable(taxable);
    //     setNumCoffees(coffee);
    //     setNumDrinks(drinks);
    //     setNumSoup(soup);
    //     setNumKitKat(kitkats);
    // }, [total])

    // useEffect(()=>{
    //     //Net total (total minus VAT)
    //     setNet(total - tax);
    // }, [tax])


    // useEffect(()=>{
    //     setTotal(0);
    //     setTax(0);
    //     setNet(0);
    //     setNumOfTaxable(0);
    //     getSalesWithDate(`${day}-${monthID+1}-2023`).then(res => setTransactions(res)); 
    // }, [day])

    //redux
    const { data: sales, isFetching, isSuccess } = useGetSalesQuery(`${day}-${monthID+1}-2023`)

    const Content = () => {
        if(isFetching){
            return(
                <ActivityIndicator/>
            )
        }else if(isSuccess){
            return(
                <Transaction transactions={sales}/>
            )
        }else if(sales.length === 0){
            <Text>No data</Text>
        }
    }

    const getFigures = () => {
        let total = 0;
        let vat = 0;
        let net = 0;
        //calculate total and vat totals
        isSuccess && sales.forEach(el=>{
            total += el.total;
            //for each sale object, iterate through it's item to get the total taxable amount
            el.items.forEach(item=>{
                if(item.taxable === "yes"){
                    vat += item.price;
                }
            })
        })
        net = total - vat;
        //return an array of all the figures to display 
        //(react re-renderes them every time the sales field of the rtk query changes)
        return [total, vat, net]
    }

    return(
        <View style={styles.container}>
            <DatePicker
                monthID={monthID}
                setMonthID={setMonthID}
                day={day}
                setDay={setDay}
            /> 
            <View style={styles.infoContainer}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', borderBottomWidth: 1}}>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={styles.infoText}>Net</Text>
                            <Text style={[styles.infoText, {fontSize: 24}]}>£{getFigures()[2].toFixed(1)}</Text>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={styles.infoText}>Total</Text>
                            <Text style={[styles.infoText, {fontSize: 24}]}>£{getFigures()[0].toFixed(1)}</Text>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={styles.infoText}>VAT</Text>
                            <Text style={[styles.infoText, {fontSize: 24}]}>£{getFigures()[1].toFixed(1)}</Text>
                        </View>
                    </View>
                </View>
            <View style={{flex: 4}}>
                <Content/>
            </View>
            <View style={{flex: 1}}>
                <Button 
                    text={"End of Day"}
                    style={styles.button}
                    textStyle={styles.text}
                    handleOnPress={()=>setModalVisible(!modalVisible)}
                />
          </View>
            {/* <PDF 
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
            /> */}
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
        fontWeight: '300',
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
        fontWeight: '300',
        padding: 4,
        alignSelf: 'center',
        color: 'white'
      },
});