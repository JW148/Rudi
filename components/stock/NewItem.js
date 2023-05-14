import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, FlatList } from "react-native";

import BottomSheet, {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import { Entypo } from "@expo/vector-icons";
import { MultiSelect } from 'react-native-element-dropdown';

import { products } from "../../Data";
import { createDoc } from "../../utils/Requests";

export default function NewItem({setNewItemOpen, setItemsOpen}){

    //bottomsheet shiz
  const bottomSheetRef= useRef(null);
  const snapPoints = useMemo(() => ["100%"], []);

  //state for the selected multilist items
  const [selected, setSelected] = useState([]);

  //input form field states
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const data = products.map((item, i) => {
    if(item.type === "meat" || item.type === "veg"){
      return {label: item.name, value: item.name};
    }
  }).filter(notUndefined => notUndefined !== undefined);

  handleOnPress = () => {
    setNewItemOpen(false);
    setItemsOpen(true);
  }

  addItems = () => {
    let item = {
      name: name,
      price: price,
      usedIn : selected,
    }
    console.log(item);
    createDoc(item);
    setNewItemOpen(false);
    setItemsOpen(true);
  }


    return(
        <BottomSheet
        style={styles.container}
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        keyboardBehavior="fillParent"
        backgroundStyle={{borderRadius: 1}}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Add new item</Text>
          </View>
          <View style={styles.inputContainer}>
              <Text style={styles.formText}>Name</Text>
            <BottomSheetTextInput value={name} style={styles.input} onChangeText={(text) => setName(text)}/>
              <Text style={styles.formText} >Price</Text>
            <BottomSheetTextInput value={price} style={styles.input} onChangeText={(text) => setPrice(text)}/> 
            <Text style={styles.formText}>Used in</Text>
            <View style={styles.selectContainer}>
            <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Select items..."
          value={selected}
          onChange={item => {
            setSelected(item);
          }}
          renderLeftIcon={() => (
            <Entypo style={styles.icon} name="add-to-list" size={22} color="black" />
          )}
          selectedStyle={styles.selectedStyle}
          maxHeight={200}
          />
          </View>
        </View>
        <View style={styles.footerContainer}>
            <TouchableOpacity style={styles.addItemBtn} onPress={addItems}>
              <Text style={styles.btnText}>Add Item</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleOnPress}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
        </View>
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 15,
      },
      headerContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "#515151",
        alignSelf: 'center',
        alignItems: 'center',
        paddingBottom: 15,
        margin: 15,
        width: "100%"
      },  
      inputContainer: {

      },  
      selectContainer: {
        padding: 5
      },
      footerContainer: {
        flex: 1,
        marginBottom: 30,
        justifyContent: 'flex-end',
      },
      input: {
        marginTop: 8,
        marginBottom: 10,
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'rgba(151, 151, 151, 0.25)',
      },
      headerText: {
        fontSize: 20,
        fontWeight: "400",
    },
    formText: {
      fontSize: 17,
      fontWeight: "300",
      alignSelf: 'center',
      marginTop: 10
  },
  addItemBtn: {
    borderRadius: 10,
    backgroundColor: "rgb(66, 133, 244)",
    marginBottom: 10
  },  
  cancelBtn: {
    borderRadius: 10,
    backgroundColor: "rgb(219, 68, 55)"
  },
  btnText: {
    textAlign: "center",
    fontWeight: "400",
    color: "white",
    fontSize: 20,
    padding: 10,
  },  
  dropdown: {
    backgroundColor: 'transparent',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
    fontWeight: "300",
  },
  selectedTextStyle: {
    fontSize: 14,
    fontWeight: "300",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
  });