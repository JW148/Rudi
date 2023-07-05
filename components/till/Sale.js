import React, {useMemo, useRef, useEffect, useSyncExternalStore, useState} from 'react';
import { StyleSheet, View, TouchableOpacity, Text, StatusBar } from 'react-native'; 

import { AntDesign } from "@expo/vector-icons";

import { newSale } from "../../utils/Requests";
import { ScrollView } from 'react-native-gesture-handler';

export default function Sale({saleItems, setSaleItems, total, setTotal}){


  //used for btn logic
  const [btnDisabled, setBtnDisabled] = useState(false);
  useEffect(() => {
    total === 0 ? setBtnDisabled(true) : setBtnDisabled(false);
  }, [total])


  handleDelete = (itemId, itemPrice) => {
    setSaleItems(saleItems.filter(item => item.id !== itemId));
    setTotal(+(total - itemPrice).toFixed(3))
  }

  handleOnPress = () => {

    //make sale object to send to DB
    let obj = {
      items: saleItems,
      total: total
    }
    newSale(obj).then((response)=>{
          console.log(response);
        }) 
        .catch((error)=>{
          console.log(error);
        });

        setTotal(0);
        setSaleItems([]);
  }

  clear = () => {
    setTotal(0);
    setSaleItems([]);
  }

  press = () => {
    console.log("pressed")
  }
  
  return(
    <View
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Current Sale</Text>
      </View>
      <View style={styles.bodyContainer}>
        <ScrollView>
          {saleItems && saleItems.map((el) => {
            return (
              <View style={styles.itemContainer}>
                <Text style={styles.infoText}>{el.name}</Text>
                <Text style={styles.infoText}>£ {el.price}</Text>
                <TouchableOpacity onPress={() => handleDelete(el.id, el.price)}>
                  <AntDesign name="delete" size={24} color="black" />
                </TouchableOpacity>  
              </View>
            )
          })}
        </ScrollView>
      </View>
      <View style={styles.totalContainer}>
          <Text style={styles.headerText}>Total            £{total}</Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={[btnDisabled ? styles.disabled : [styles.btn, {backgroundColor: '#027516'}]]} disabled={btnDisabled} onPress={handleOnPress}>
          <Text style={styles.btnText}>Cash</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[btnDisabled ? styles.disabled : [styles.btn, {backgroundColor: 'red'}]]} disabled={btnDisabled} onPress={clear}>
          <Text style={styles.btnText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[btnDisabled ? styles.disabled : [styles.btn, {backgroundColor: '#024075'}]]} disabled={btnDisabled} onPress={handleOnPress}>
          <Text style={styles.btnText}>Card</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 5
  },  
  headerContainer: {
    flex: 1,
    borderBottomColor: "#515151",
    borderBottomWidth: 1,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bodyContainer: {
    flex: 3,
    marginTop: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  totalContainer: {
    flex: 1,
    borderBottomColorolor: "#515151",
    borderBottomWidth: 1,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  headerText: {
    fontSize: 20,
    fontWeight: "300",
  },
  infoText: {
    fontSize: 17,
    fontWeight: "300",
    padding: 4
  }, 
  btn: {
    flex: 1,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 5
  }, 
  disabled: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "rgba(50, 50, 50, 0.2)",
    marginBottom: 10,
    marginHorizontal: 10
  }, 
  btnText: {
    textAlign: "center",
    fontWeight: "400",
    color: "white",
    fontSize: 20,
    padding: 10,
  },  
});