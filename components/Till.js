import React, {useState} from 'react';
import { StyleSheet, View, TouchableOpacity, Text, StatusBar } from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import VegMenu from './VegMenu';
import MeatMenu from './MeatMenu';
import CoffeeMenu from './CoffeeMenu';
import DrinksMenu from './DrinksMenu';
import MiscMenu from './MiscMenu';
import { products } from '../Data';

export default function Till(){

  //state vars
  const [total, setTotal] = useState(0);
  const [vegOpen, setVegOpen] = useState(false);
  const [meatOpen, setMeatOpen] = useState(false);
  const [coffeeOpen, setCoffeeOpen] = useState(false);
  const [drinksOpen, setDrinksOpen] = useState(false);
  const [miscOpen, setMiscOpen] = useState(false);

  //onPress avent to update the total
  const handleOnPress = (name) => {
    let product = products.find(o => o.name === name);
    setTotal(+(total + product.price).toFixed(3));
  };

  return(
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
      <View style={styles.row}>
      <TouchableOpacity style={styles.button} onPress={() => setVegOpen(true)}>
        <Text>Veg</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setMeatOpen(true)}>
        <Text>Meat</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.row}>
      <TouchableOpacity style={styles.button} onPress={() => setCoffeeOpen(true)}>
        <Text>Coffee</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.row}>
      <TouchableOpacity style={styles.button} onPress={() => setDrinksOpen(true)}>
        <Text>Drinks</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.row}>
      <TouchableOpacity style={styles.button} onPress={() => handleOnPress('Soup')}>
        <Text>Soup</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleOnPress('Crisps')}>
        <Text>Crisps</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.row}>
      <TouchableOpacity style={styles.button} onPress={() => handleOnPress('Pastry')}>
        <Text>Pastry</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleOnPress('Treats')}>
        <Text>Treats</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.row}>
      <TouchableOpacity style={styles.button} onPress={() => setMiscOpen(true)}>
        <Text>Misc</Text>
      </TouchableOpacity>
      <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flexDirection: 'column'}}>
        <Text>Total</Text>
        <Text>£{total}</Text>
        </View>
      </View>
        <TouchableOpacity style={styles.button} onPress={() => setTotal(0)}>
        <Text>Clear</Text>
      </TouchableOpacity>
      </View>
      {
        vegOpen && (
          <VegMenu
            setVegOpen={setVegOpen}
            total={total}
            setTotal={setTotal}
            products={products}
          />
        )
      }
      {
        meatOpen && (
          <MeatMenu 
          setMeatOpen={setMeatOpen}
          total={total}
          setTotal={setTotal}
          products={products}
          />
        )
      }
      {
        coffeeOpen && (
          <CoffeeMenu
            setCoffeeOpen={setCoffeeOpen}
            total={total}
            setTotal={setTotal}
            products={products}
          />
        )
      }
      {
        drinksOpen && (
          <DrinksMenu
            setDrinksOpen={setDrinksOpen}
            total={total}
            setTotal={setTotal}
            products={products}
          />
        )
      }
      {
        miscOpen && (
          <MiscMenu
            setMiscOpen={setMiscOpen}
            total={total}
            setTotal={setTotal}
            products={products}
          />
        )
      }
      <StatusBar 
      hidden={true} />
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
    backgroundColor: '#DDDDDD',
    borderColor: 'black',
    padding: 10,
    margin: 5,
    flex: 1,
    borderRadius: 5,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  }
});