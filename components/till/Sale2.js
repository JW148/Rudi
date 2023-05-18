import React, {useMemo, useRef} from 'react';
import { StyleSheet, View, TouchableOpacity, Text, StatusBar } from 'react-native'; 

import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { AntDesign } from "@expo/vector-icons";

import { newSale } from "../../utils/Requests";

export default function Sale2({setSaleOpen, saleItems, setSaleItems, total, setTotal}){
  
  //bottomsheet shiz
  const bottomSheetRef= useRef(null);
  const snapPoints = useMemo(() => ["100%"], []);

  handleDelete = (itemId, itemPrice) => {
    console.log(itemId);
    setSaleItems(saleItems.filter(item => item.id !== itemId));
    setTotal(+(total - itemPrice).toFixed(3))
    console.log(saleItems);
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
    borderTopColorolor: "#515151",
    borderTopWidth: 1,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
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
});