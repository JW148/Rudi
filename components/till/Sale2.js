import React, {useMemo, useRef, useEffect, useSyncExternalStore, useState} from 'react';
import { StyleSheet, View, TouchableOpacity, Text, StatusBar } from 'react-native'; 

import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { AntDesign } from "@expo/vector-icons";

import { newSale } from "../../utils/Requests";

export default function Sale2({setSaleOpen, saleItems, setSaleItems, total, setTotal}){
  
  //bottomsheet shiz
  const bottomSheetRef= useRef(null);
  const snapPoints = useMemo(() => ["100%"], []);

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
    setSaleOpen(false);
    setTotal(0);
    setSaleItems([]);

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
        })  
  }
  
  return(
    <BottomSheet
      style={styles.container}
      snapPoints={snapPoints}
      ref={bottomSheetRef}
      backgroundStyle={{borderRadius: 1}}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Current Sale</Text>
      </View>
      <View style={styles.bodyContainer}>
        <BottomSheetScrollView>
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
        </BottomSheetScrollView>
      </View>
      <View style={styles.totalContainer}>
          <Text style={styles.headerText}>Total            £{total}</Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={[btnDisabled ? styles.disabled : styles.btn]} disabled={btnDisabled} onPress={handleOnPress}>
          <Text style={styles.btnText}>Submit Sale</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={() => {setSaleOpen(false);}}>
          <AntDesign name="closecircle" size={32} color="#DDDDDD" />
        </TouchableOpacity>
      </View>
    </BottomSheet>
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
    flex: 7,
    marginTop: 10,
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
    marginHorizontal: 18
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
    borderRadius: 10,
    backgroundColor: "rgb(66, 133, 244)",
    marginBottom: 10
  }, 
  disabled: {
    borderRadius: 10,
    backgroundColor: "rgba(50, 50, 50, 0.2)",
    marginBottom: 10
  }, 
  btnText: {
    textAlign: "center",
    fontWeight: "400",
    color: "white",
    fontSize: 20,
    padding: 10,
  },  
});