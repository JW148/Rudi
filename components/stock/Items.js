import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";

export default function Items(){

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
    },
    text: {
        fontSize: 20
    }
  });