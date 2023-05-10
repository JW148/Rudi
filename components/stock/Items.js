import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, FlatList } from "react-native";

import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { AntDesign } from "@expo/vector-icons";

import { getDocs, createDoc, deleteDoc } from "../../utils/Requests";
import ItemInfo from "./ItemInfo";


export default function Items({setItemsOpen, setNewItemOpen}){
  //store stock item objects in an array
  const [stock, setStock] = useState([]);

  //get stock items
  // useEffect(()=>{
  //   getDocs().then((response)=>{
  //     setStock(response);
  //     console.log(response);
  //   }) 
  //   .catch((error)=>{
  //     console.log(error);
  //   })  
  // }, []);  

  const items = [
    {name: "Bacon",
     price: 2.2,
     used: 2, 
    },
    {name: "Ham",
    price: 2.2,
    used: 2, 
    },
    {name: "Mozzarella",
    price: 2.2,
    used: 2, 
    },
    {name: "Swiss Cheese",
    price: 2.2,
    used: 2, 
    },
    {name: "Falafel",
    price: 2.2,
    used: 2, 
    },
    {name: "Hummus",
    price: 2.2,
    used: 2, 
    },
    {name: "Tomatos",
    price: 2.2,
    used: 2, 
    },
    {name: "Lettuce",
    price: 2.2,
    used: 2, 
    },
    {name: "Peppers",
    price: 2.2,
     used: 2, 
    },
  ]

  //bottomsheet shiz
  const bottomSheetRef= useRef(null);
  const snapPoints = useMemo(() => ["100%"], []);

  //render bottomSheetScrollView items
  const renderItem = useCallback(
    (item) => (
      <ItemInfo data={item}/>
    )
  )

  handleOnPress = () => {
    setItemsOpen(false);
    setNewItemOpen(true);
  }

  return (
    <BottomSheet
      style={styles.container}
      snapPoints={snapPoints}
      ref={bottomSheetRef}
      backgroundStyle={{borderRadius: 1}}
    >
      <View style={styles.itemsContainer}>
      <BottomSheetScrollView>
        {items.map(renderItem)}
        <View style={styles.btn}>
          <TouchableOpacity onPress={handleOnPress}>
            <Text style={styles.text}>New Item</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetScrollView>
      </View>
      <View style={styles.closeBtnContainer}>
      <TouchableOpacity onPress={() => {setItemsOpen(false);}}>
          <AntDesign name="closecircle" size={32} color="#DDDDDD" />
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      paddingHorizontal: 5,
    },
    itemsContainer: {
      flex: 7,
    },
    closeBtnContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    btn:{
      borderRadius: 5,
      backgroundColor: "#f5f5f5",
      alignItems: 'center',
      padding: 10,
      margin: 10
    },
    text: {
      fontSize: 17,
        fontWeight: "300",
    }
  });