import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";

import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { AntDesign } from "@expo/vector-icons";


import Button from "../Button";

export default function Menu({header, openClose, items, handleOnPress, filters}){
    
    // bottomShelf variables
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ["5%","100%"], []);


    let prevEl = items[0].type;
    const colours = ['rgba(0, 255, 0, 0.1)', 'rgba(255, 0, 0, 0.1)', 'rgba(0, 0, 255, 0.1)', 'rgba(0, 200, 255, 0.1)', 'rgba(200, 0, 255, 0.1)', 'rgba(200, 200, 255, 0.1)']
    let index = 0;

    return(
        <BottomSheet
            style={styles.container}
            snapPoints={snapPoints}
            ref={bottomSheetRef}
            backgroundStyle={{borderRadius: 1}}
        >
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>{header}</Text>
            </View>
            <View style={styles.itemContainer}>
            <BottomSheetScrollView>
                {items.map((item) => {
                    if(item.type !== prevEl){
                        prevEl = item.type;
                        index++;
                        return(
                            <Button 
                            style={[styles.btn, {backgroundColor: colours[index]}]}
                            text={item.name} 
                            handleOnPress={() => handleOnPress(item.name)}
                            textStyle={styles.text}
                        />
                        )
                    }else{
                        return(
                            <Button 
                            style={[styles.btn, {backgroundColor: colours[index]}]}
                            text={item.name} 
                            handleOnPress={() => handleOnPress(item.name)}
                            textStyle={styles.text}
                        />  
                        )
                    }
                })}
            </BottomSheetScrollView>
            </View>
            <View style={styles.footerContainer}>
            <TouchableOpacity onPress={() => {openClose(false);}}>
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
    },
    headerContainer: {
        flex: 1,
        borderBottomColor: "#515151",
        borderBottomWidth: 1,
        width: '85%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemContainer: {
        flex:8,
        margin: 10,
        justifyContent: 'center',
    },
    footerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },  
      text: {
        fontSize: 17,
        fontWeight: "300",
        padding: 4,
        alignSelf: 'center'
      },
      headerText: {
        fontSize: 24,
        fontWeight: "300",
      },
      btn: {
        flex: 1,
        margin: 3,
        padding: 5,
        marginHorizontal: 25,
        borderRadius: 5,
      },
  });