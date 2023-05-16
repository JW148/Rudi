import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, FlatList, ActivityIndicator } from "react-native";

import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { AntDesign } from "@expo/vector-icons";

export default function Sale({setSaleOpen, saleItems, setSaleItems}){

    //bottomsheet shiz
  const bottomSheetRef= useRef(null);
  const snapPoints = useMemo(() => ["100%"], []);

  //render bottomSheetScrollView items
  const renderItem = useCallback(
    (item) => (
      <Text>{item.name}</Text>
    )
  )

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
            <View style={styles.itemsContainer}>
                <BottomSheetScrollView>
                {saleItems && saleItems.map((el, i) => {
                    return (
                        <View style={styles.scrollViewContainer}>
                            <Text style={styles.infoText}>{el.name}</Text>
                            <Text style={styles.infoText}>£ {el.price}</Text>
                            <TouchableOpacity>
                                <AntDesign name="delete" size={24} color="black" />
                            </TouchableOpacity>  
                        </View>
                    ) 
                })}
                </BottomSheetScrollView>
            </View>
            <View style={styles.closeBtnContainer}>
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
      paddingHorizontal: 5,
      alignItems: 'center',
    },
    headerContainer: {
        alignSelf: 'stretch',
        borderBottomWidth: 2,
        borderBottomColor: "#515151",
        width: "100%",
    },  
    itemsContainer: {
        flex: 7,
      },
    closeBtnContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      },
      scrollViewContainer: {
        flexDirection: 'row'
      },    
    btn:{
      borderRadius: 5,
      backgroundColor: "#f5f5f5",
      alignItems: 'center',
      padding: 10,
      margin: 10
    },
    headerText: {
        fontSize: 20,
        fontWeight: "300",
    },
    text: {
      fontSize: 17,
        fontWeight: "300",
    },
    infoText: {
        fontSize: 15,
        fontWeight: "300",
        padding: 4
    }, 
  });