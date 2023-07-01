import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import DatePicker from './sales/DatePicker';
import Test from './sales/Test';

export default function Sales(){
    return(
        <View style={styles.container}>
            <DatePicker/> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});