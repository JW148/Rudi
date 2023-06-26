import React, {useEffect, useState} from 'react';
import { StyleSheet, View, TouchableOpacity, Text, StatusBar, ToastAndroid } from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import Sale from './till/Sale';
import Button from './Button';
import { products } from '../Data';
import Menu from './till/Menu';
import { getDocs } from '../utils/Requests';

export default function Till(){

  //state vars
  const [total, setTotal] = useState(0);

  const [sandwichesOpen, setSandwichesOpen] = useState(false);
  const [coffeeOpen, setCoffeeOpen] = useState(false);
  const [otherOpen, setOtherOpen] = useState(false);
  const [saleOpen, setSaleOpen] = useState(false);

  const [saleItems, setSaleItems] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);

  //onPress avent to update the total
  const handleOnPress = (name) => {
    //have to deep copy the product object otherwise you get weird referencing based bug
    let product = JSON.parse(JSON.stringify(products.find(o => o.name === name)));
    product.id = currIndex;
    setCurrIndex(currIndex + 1);
    console.log(currIndex);
    setTotal(+(total + product.price).toFixed(3));
    saleItems.push(product);
    console.log(saleItems);
  };

  test = () => {
    console.log("hello")
  }

  //sorting product data into categories to display in the menus
  const sandwiches = products.filter((el) => {
    return el.type === 'meat' ||
           el.type === 'veg'
  });
  const coffee = products.filter((el) => {
    return el.type === 'coffee'
  })
  const other = products.filter((el) => {
    return el.type === 'drink' ||
           el.type === 'treats' ||
           el.type === 'drink' ||
           el.type === 'pastry' ||
           el.type === 'soup' ||
           el.type === 'crisps' ||
           el.type === 'misc' 
  })

  return(
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{flex:1}}>
      <View style={styles.container}>
        <View style={{flex: 1}}>
        <View style={styles.row}>
          <Button style={styles.button} text={'Sandwiches'} handleOnPress={() => setSandwichesOpen(true)} textStyle={styles.text}/>
          <Button style={styles.button} text={'Coffee'} handleOnPress={() => setCoffeeOpen(true)} textStyle={styles.text}/>
        </View>
        <View style={styles.row}>
          <Button style={styles.button} text={'Other'} handleOnPress={() => setOtherOpen(true)} textStyle={styles.text}/>
        </View>
      </View>
      <View style={{flex: 2}}>
        <Sale 
            setSaleOpen={setSaleOpen}
            saleItems={saleItems}
            setSaleItems={setSaleItems}
            total={total}
            setTotal={setTotal}
        />
          <StatusBar hidden={true} />
      </View>
      {
        sandwichesOpen && (
          <Menu
          header={'Sandwiches'}
            openClose={setSandwichesOpen}
            handleOnPress={handleOnPress}
            items={sandwiches}
            filters={['veg', 'meat']}
          />
        )
      }
      {
        coffeeOpen && (
          <Menu
          header={'Coffee'}
            openClose={setCoffeeOpen}
            handleOnPress={handleOnPress}
            items={coffee}
          />
        )
      }
      {
        otherOpen && (
          <Menu
          header={'Other'}
            openClose={setOtherOpen}
            handleOnPress={handleOnPress}
            items={other}
          />
        )
      }
      </View>
    </View>
    </GestureHandlerRootView>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 5,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#128026',
    borderColor: 'black',
    padding: 10,
    margin: 5,
    flex: 1,
    borderRadius: 5,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
    fontWeight: "300",
    padding: 4,
    alignSelf: 'center',
    color: 'white'
  },
});