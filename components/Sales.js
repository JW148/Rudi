import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Alert } from "react-native";

import DatePicker from "./sales/DatePicker";
import Transaction from "./sales/Transaction";

import moment from "moment";

import Button from "../components/Button";
import PDF from "./sales/PDF";

import { useGetSalesQuery } from "../Redux/features/api/apiSlice";

export default function Sales() {
  const [monthID, setMonthID] = useState(moment().month());
  const [day, setDay] = useState(moment().format("D"));

  const [modalVisible, setModalVisible] = useState(false);

  //redux
  const {
    data: sales,
    isFetching,
    isSuccess,
    error,
  } = useGetSalesQuery(`${day}-${monthID + 1}-2023`);

  const Content = () => {
    if (isFetching) {
      return <ActivityIndicator size="large" />;
    } else if (isSuccess) {
      if (sales.length === 0)
        return (
          <Text style={[styles.text, { color: "black" }]}>
            No data recorded
          </Text>
        );
      else return <Transaction transactions={sales} />;
    } else if (error) {
      createAlert(error.error);
      return (
        <Text style={[styles.text, { color: "black" }]}>
          Error fetching data
        </Text>
      );
    }
  };

  const createAlert = (err) =>
    Alert.alert("Something went wrong...", err, [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  let total = 0;
  let vat = 0;
  let net = 0;
  let taxable = 0;

  const getFigures = () => {
    total = 0;
    vat = 0;
    net = 0;
    taxable = 0;
    //calculate total and vat totals
    isSuccess &&
      sales.forEach((el) => {
        total += el.total;
        //for each sale object, iterate through it's item to get the total taxable amount
        el.items.forEach((item) => {
          if (item.taxable === "yes") {
            vat += item.price;
            taxable++;
          }
        });
      });
    net = total - vat;
    //return an array of all the figures to display
    //(react re-renderes them every time the sales field of the rtk query changes)
    return [total, vat, net];
  };

  return (
    <View style={styles.container}>
      <DatePicker
        monthID={monthID}
        setMonthID={setMonthID}
        day={day}
        setDay={setDay}
      />
      <View style={styles.infoContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            borderBottomWidth: 1,
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.infoText}>Net</Text>
            <Text style={[styles.infoText, { fontSize: 24 }]}>
              £{getFigures()[2].toFixed(1)}
            </Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.infoText}>Total</Text>
            <Text style={[styles.infoText, { fontSize: 24 }]}>
              £{getFigures()[0].toFixed(1)}
            </Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.infoText}>VAT</Text>
            <Text style={[styles.infoText, { fontSize: 24 }]}>
              £{getFigures()[1].toFixed(1)}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 4 }}>
        <Content />
      </View>
      <View style={{ flex: 1 }}>
        <Button
          text={"End of Day"}
          style={styles.button}
          textStyle={styles.text}
          handleOnPress={() => setModalVisible(!modalVisible)}
        />
      </View>
      <PDF
        transactions={sales}
        appTotal={total}
        appVAT={vat}
        appNet={net}
        month={monthID + 1}
        day={day}
        numOfTaxable={taxable}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    margin: 10,
  },
  infoText: {
    fontWeight: "300",
    fontSize: 32,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#128026",
    borderColor: "black",
    padding: 10,
    margin: 5,
    marginHorizontal: 10,
    flex: 1,
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: "300",
    padding: 4,
    alignSelf: "center",
    color: "white",
  },
});
