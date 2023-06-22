import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";

export default function Button({style, text, handleOnPress, textStyle}){
    return(
        <TouchableOpacity style={style} onPress={handleOnPress}>
            <Text style={textStyle}>{text}</Text>
        </TouchableOpacity>
    )
}
